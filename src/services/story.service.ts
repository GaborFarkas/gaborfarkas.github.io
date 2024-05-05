import { Injectable } from "@angular/core";
import { StoryModel, StoryType } from "../models/story.model";
import { ConfigService } from "./config.service";

/**
 * A service with lists of insight and case study stories with their query and access methods.
 */
@Injectable()
export class StoryService {
    /**
     * Stories available with slugs as keys.
     */
    private stories: Map<string, StoryModel> = new Map();

    /**
     * The story fetching operation, if it is still running.
     */
    private fetchLock?: Promise<void>;

    constructor(private configService: ConfigService) {
        this.fetchLock = this.fetchStoriesAsync().then(function (this: StoryService) {
            this.fetchLock = undefined;
        }.bind(this));
    }

    /**
     * Returns every insight as an iterable.
     */
    public async listInsightsAsync(): Promise<StoryModel[]> {
        if (this.fetchLock) {
            await this.fetchLock;
        }

        return [...this.stories.values()].filter(story => story.category === StoryType.INSIGHT);
    }

    /**
     * Returns a single insight based on its URL slug.
     * @param slug The URL slug.
     * @returns The insight, if found. Undefined, otherwise.
     */
    public async getInsightAsync(slug: string): Promise<StoryModel | undefined> {
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
            category: StoryType.UNKNOWN
        }
    }

    /**
     * Fetches the stories from a global configuration file and restructures for this service.
     */
    private async fetchStoriesAsync() {
        const stories = await this.configService.getConfigAsync<StoryModel[]>('stories.json');
        for (let story of stories) {
            // Store stories with their slugs as keys.
            this.stories.set(story.slug, story);
        }
    }
}
