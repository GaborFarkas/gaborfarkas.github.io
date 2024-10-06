import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoryModel, StoryType } from '@/models/story.model';
import { PageUrlMapping } from '@/models/page-url-mapping.model';
import { StoryService } from '@/services/story.service';
import { FileService } from '@/services/file.service';
import { CardComponent } from '@/components/card/card.component';

/**
 * Frame component of the insights and case studies lists.
 */
@Component({
    selector: 'stories-page',
    standalone: true,
    imports: [CardComponent],
    providers: [StoryService, FileService],
    templateUrl: './stories.page.html',
    styleUrl: './stories.page.css'
})
export class StoriesPage implements OnInit, OnDestroy {
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

    /**
     * Gets the element reference of the grid container.
     */
    @ViewChild('storyGrid') private storyGridElem?: ElementRef<HTMLDivElement>;

    /**
     * The current page displayed. New pages are loaded when the user reaches the bottom.
     */
    private page: number = 0;

    /**
     * A lock to avoid requesting new pages when there are no more.
     */
    private noMorePages: boolean = false;

    constructor(private router: Router,
        private storyService: StoryService
    ) { }

    async ngOnInit() {
        if (this.router.url.endsWith(PageUrlMapping.INSIGHTS)) {
            this.type = StoryType.INSIGHT;
            await this.getNextPageAsync();
        }

        if (this.type === StoryType.UNKNOWN) {
            // Can only reach this line on dev error. Should throw an error instead?
            this.router.navigate([PageUrlMapping.HOME]);
        }

        document.addEventListener('scroll', this.onScroll);
    }

    ngOnDestroy() {
        document.removeEventListener('scroll', this.onScroll);
    }

    /**
     * Fetches the next page of stories from the story service.
     */
    private async getNextPageAsync() {
        const newStories = await this.storyService.listStoriesAsync(this.type, {
            orderBy: 'created',
            ascending: false,
            skip: this.page * 10,
            take: 10
        });
        this.stories = this.page === 0 ? newStories : this.stories.concat(newStories);

        this.page++;
        if (newStories.length < 10) {
            this.noMorePages = true;
        }
    }

    /**
     * Prebound scroll event listener fetching new stories when the user reaches the bottom of the container div.
     * Pre-binding is required for cleaning up when the component is destroyed.
     */
    private onScroll = function (this: StoriesPage, evt: Event) {
        if (!this.noMorePages && this.storyGridElem?.nativeElement &&
            window.scrollY > this.storyGridElem.nativeElement.offsetTop + this.storyGridElem.nativeElement.clientHeight - window.innerHeight
        ) {
            this.getNextPageAsync();
        }
    }.bind(this);
}
