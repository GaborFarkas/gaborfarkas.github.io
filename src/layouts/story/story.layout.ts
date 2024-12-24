import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StoryModel, StoryType } from '@/models/story.model';
import { PageUrlMapping } from '@/models/page-url-mapping.model';
import { StoryService } from '@/services/story.service';
import { CommonModule } from '@angular/common';
import { FileService } from '@/services/file.service';

/**
 * Layout component of a single insight or case study page.
 */
@Component({
    selector: 'story-layout',
    imports: [CommonModule, RouterOutlet],
    providers: [StoryService, FileService],
    templateUrl: './story.layout.html',
    styleUrl: './story.layout.css'
})
export class StoryLayout {
    /**
     * Story types exposed to the template.
     */
    protected readonly StoryType = signal(StoryType).asReadonly();

    /**
     * Type of the displayed story.
     */
    protected type = signal(StoryType.UNKNOWN);

    /**
     * The displayed story's descriptor.
     */
    protected story: WritableSignal<StoryModel>;

    /**
     * The base URL fragment for the category page.
     */
    protected baseUrl = signal('');

    /**
     * The category label used in the beadcrumbs.
     */
    protected categoryLabel = signal('');

    constructor(private router: Router,
        private storyService: StoryService
    ) {
        // Default story to notfound to avoid edge-case exceptions.
        this.story = signal(storyService.notFound());

        // Process the path. It should be host/category/slug, but start from the end just in case.
        const paths = this.router.url.split('/');
        this.baseUrl.set(paths[paths.length - 2]);
        const slug = paths[paths.length - 1];

        if (this.baseUrl() === PageUrlMapping.INSIGHTS) {
            // No need to await, we can call this from the ctor.
            this.fetchStoryAsync(StoryType.INSIGHT, slug);
            this.categoryLabel.set('Insights');
        }
    }

    /**
     * Fetches a story from the story service.
     * @param type The story category.
     * @param slug The URL slug of the story.
     */
    private async fetchStoryAsync(type: StoryType, slug: string) {
        const story = await this.storyService.getStoryAsync(slug);

        if (story) {
            this.story.set(story);
            // Only set the type if there is a story, so we can handle 404 pages as UNKNOWN.
            this.type.set(type);
        }
    }
}
