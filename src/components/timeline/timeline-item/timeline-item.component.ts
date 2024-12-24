import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A timeline item containing data of a single event.
 * Should be used in a timeline component.
 */
@Component({
    selector: 'div.timeline-item',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './timeline-item.component.html',
    styleUrl: './timeline-item.component.css',
    host: {
        '[class]': 'class()',
        '[style.--item-color]': 'color()'
    }
})
export class TimelineItemComponent {
    /**
     * The title of this item.
     */
    public itemTitle = input.required<string>();

    /**
     * The icon of this item.
     */
    public icon = input.required<IconDefinition>();

    /**
     * Invert the direction of this timeline item (right to left).
     */
    public reverse = model(false);

    /**
     * The color class of this item.
     */
    public color = model('#ffffff');

    /**
     * Fired when the current item is extended.
     */
    public extend = output<TimelineItemComponent>();

    /**
     * The host element's class attribute.
     */
    protected class = computed(() => this.reverse() ?
        'justify-self-end lg:mr-24' : 'justify-self-start lg:ml-24');

    /**
     * The current item is extended.
     */
    protected extended = signal(false);

    /**
     * Presumably unique ID used by ARIA attributes.
     */
    protected readonly id = signal(Math.random().toString(36).replace('0.', '')).asReadonly();

    protected toggle(): void {
        if (this.extended()) {
            this.close();
        } else {
            this.extended.set(true);
            this.extend.emit(this);
        }
    }

    close(): void {
        this.extended.set(false);
    }
}
