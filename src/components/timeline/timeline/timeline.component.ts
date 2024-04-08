import { AfterContentInit, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { randomizer } from '../../../utils/array';

/**
 * A general timeline component with a hard-coded design and extendable items.
 */
@Component({
    selector: 'div.timeline',
    standalone: true,
    templateUrl: './timeline.component.html',
    styleUrl: './timeline.component.css'
})
export class TimelineComponent implements AfterContentInit {
    /**
     * Start the timeline with a right-directed element.
     */
    @Input() startRight: boolean = false;

    /**
     * The colors (CSS format: hex, rgb, or rgba) used by the timeline items.
     * Every timeline item gets a random color from this list without repeating on successive items.
     */
    @Input() colors: string[] = ['rgb(101 163 13)', 'rgb(79 70 229)', 'rgb(8 145 178)', 'rgb(13 148 136)', 'rgb(202 138 4)'];

    /**
     * The timeline items associated with this timeline component.
     */
    @ContentChildren(TimelineItemComponent) protected items?: QueryList<TimelineItemComponent>;

    /**
     * The host element's class attribute.
     */
    @HostBinding('class') protected class = 'relative';

    /**
     * The currently selected (extended) timeline item.
     */
    protected selItem?: TimelineItemComponent;

    /**
     * Extend an item in the timeline.
     * @param item
     */
    private extendItem(item: TimelineItemComponent) {
        // As extending an item breaks the design of successors, close the previously extended one.
        if (this.selItem && this.selItem !== item) {
            this.selItem.close();
        }

        this.selItem = item;
    }

    ngAfterContentInit(): void {
        if (this.items) {
            const colorRandomizer = randomizer(this.colors);

            for (let i = 0; i < this.items.length; ++i) {
                const item = this.items.get(i)!;

                // Bind timeline items to this timeline component manually.
                item.reverse = this.startRight ? i % 2 === 0 : i % 2 !== 0;
                item.color = colorRandomizer.next().value!;
                item.extend.subscribe(itemComponent => {
                    this.extendItem(itemComponent);
                });
            }
        }
    }
}
