import { Injectable } from "@angular/core";
import { StoryModel, StoryType } from "@/models/story.model";
import { FileService } from "@/services/file.service";
import { ListOptions } from "@/models/list.model";

/**
 * A service with lists of insight and case study stories with their query and access methods.
 */
@Injectable()
export class StoryService {
    /**
     * Stories available with slugs as keys.
     */
    private stories = new Map<string, StoryModel>();

    /**
     * The story fetching operation, if it is still running.
     */
    private fetchLock?: Promise<void>;

    constructor(private fileService: FileService) {
        this.fetchLock = this.fetchStoriesAsync().then(function (this: StoryService) {
            this.fetchLock = undefined;
        }.bind(this));
    }

    /**
     * Returns every matching story.
     */
    public async listStoriesAsync(type: StoryType, options: ListOptions): Promise<StoryModel[]> {
        if (this.fetchLock) {
            await this.fetchLock;
        }

        const typedItems = [...this.stories.values()].filter(story => story.category === type);
        if (options.skip > typedItems.length) {
            return [];
        }
        return typedItems
            //TODO: This is sort of ugly
            .sort((a, b) => ((options.ascending ? a : b) as unknown as Record<string, number>)[options.orderBy] -
                ((options.ascending ? b : a) as unknown as Record<string, number>)[options.orderBy])
            .slice(options.skip, options.skip + options.take);
    }

    /**
     * Returns a single story based on its URL slug.
     * @param slug The URL slug.
     * @returns The story, if found. Undefined, otherwise.
     */
    public async getStoryAsync(slug: string): Promise<StoryModel | undefined> {
        if (this.fetchLock) {
            await this.fetchLock;
        }

        if (this.stories.has(slug)) {
            return this.stories.get(slug)!;
        }

        return undefined;
    }

    /**
     * Returns an empty story descriptor with a NotFoundComponent inside.
     * @returns The 404 descriptor.
     */
    public notFound(): StoryModel {
        return {
            title: '',
            description: '',
            created: new Date(),
            lastModified: new Date(),
            slug: '',
            category: StoryType.UNKNOWN,
            thumbUrl: ''
        }
    }

    /**
     * Fetches the stories from a global configuration file and restructures for this service.
     */
    private async fetchStoriesAsync() {
        const stories = await this.fileService.getConfigAsync<StoryModel[]>('stories.json');
        for (const story of stories) {
            // Store stories with their slugs as keys.
            this.stories.set(story.slug, story);
        }
    }
}
