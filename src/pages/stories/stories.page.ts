import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoryModel, StoryType } from '../../models/story.model';
import { PageUrlMapping } from '../../models/page-url-mapping.model';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';

/**
 * Frame component of the insights and case studies lists.
 */
@Component({
    selector: 'stories-page',
    standalone: true,
    imports: [CommonModule],
    providers: [StoryService],
    templateUrl: './stories.page.html'
})
export class StoriesPage {
    /**
     * Story types exposed to the template.
     */
    protected StoryType = StoryType;

    /**
     * Type of the listed stories.
     */
    protected type: StoryType = StoryType.UNKNOWN;

    /**
     * Returns the base URL for the current story category.
     */
    protected get baseUrl(): string {
        switch (this.type) {
            case StoryType.INSIGHT:
                return PageUrlMapping.INSIGHTS;
            default:
                return PageUrlMapping.HOME;
        }
    }

    /**
     * Gets or sets the listed stories.
     */
    protected stories: StoryModel[] = [];

    constructor(private router: Router,
                private storyService: StoryService
    ) {
        if (this.router.url.endsWith(PageUrlMapping.INSIGHTS)) {
            this.type = StoryType.INSIGHT;
            this.stories = [...this.storyService.listInsights()].reverse();
        }

        if (this.type === StoryType.UNKNOWN) {
            // Can only reach this line on dev error. Should throw an error instead?
            this.router.navigate([PageUrlMapping.HOME]);
        }
    }
}
