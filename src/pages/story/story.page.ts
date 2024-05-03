import { Component, Type } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StoryModel, StoryType } from '../../models/story.model';
import { PageUrlMapping } from '../../models/page-url-mapping.model';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';

/**
 * Frame component of a single insight or case study page.
 */
@Component({
    selector: 'story-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    providers: [StoryService, ConfigService],
    templateUrl: './story.page.html'
})
export class StoryPage {
    /**
     * Story types exposed to the template.
     */
    protected StoryType = StoryType;

    /**
     * Type of the displayed story.
     */
    protected type: StoryType = StoryType.UNKNOWN;

    /**
     * The displayed story's descriptor.
     */
    protected story: StoryModel;

    /**
     * The resolved component of the displayed story.
     */
    protected component?: Type<unknown>;

    constructor(private router: Router,
        private storyService: StoryService
    ) {
        // Default story to notfound to avoid edge-case exceptions.
        this.story = storyService.notFound();

        // Process the path. It should be host/category/slug, but start from the end just in case.
        const paths = this.router.url.split('/');
        const category = paths[paths.length - 2];
        const slug = paths[paths.length - 1];

        if (category === PageUrlMapping.INSIGHTS) {
            // No need to await, we can call this from the ctor.
            this.fetchStoryAsync(StoryType.INSIGHT, slug);
        }
    }

    /**
     * Fetches a story from the story service.
     * @param type The story category.
     * @param slug The URL slug of the story.
     */
    private async fetchStoryAsync(type: StoryType, slug: string) {
        let story: StoryModel | undefined;

        switch (type) {
            case StoryType.INSIGHT:
                story = await this.storyService.getInsightAsync(slug);
                break;
        }

        if (story) {
            this.story = story;
            // Only set the type if there is a story, so we can handle 404 pages as UNKNOWN.
            this.type = type;
        }
    }
}
