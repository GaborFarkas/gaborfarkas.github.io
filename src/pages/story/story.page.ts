import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { StoryModel, StoryType } from '../../models/story.model';
import { PageUrlMapping } from '../../models/page-url-mapping.model';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { getComponentById } from '../../utils/angular';
import { StoryModule } from '../../components/story/story.module';

/**
 * Frame component of a single insight or case study page.
 */
@Component({
    selector: 'story-page',
    standalone: true,
    imports: [CommonModule],
    providers: [StoryService, ConfigService, StoryModule],
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
     * Fetches a story from the story service and resolves its component, if found.
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

        // Either loadComponent or componentId must be set for the component to be loadable.
        if (story && (story.loadComponent || story.componentId)) {
            // Load the component into a property to avoid an infinite refresh cycle from the template.
            try {
                this.component = story.loadComponent ? await story.loadComponent() : getComponentById(story.componentId!);

                this.story = story;
                // Only set the type if there is a story, so we can handle 404 pages as UNKNOWN.
                this.type = type;
            } catch (ex) {
                // Module could not be loaded, revert to the notfound component.
                this.component = await this.story.loadComponent!();
                throw ex;
            }
        } else {
            this.component = await this.story.loadComponent!();
        }
    }
}
