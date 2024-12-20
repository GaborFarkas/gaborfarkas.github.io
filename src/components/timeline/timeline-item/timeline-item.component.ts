import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A timeline item containing data of a single event.
 * Should be used in a timeline component.
 */
@Component({
    selector: 'div.timeline-item',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './timeline-item.component.html',
    styleUrl: './timeline-item.component.css'
})
export class TimelineItemComponent {
    /**
     * The title of this item.
     */
    @Input({ required: true }) itemTitle!: string;

    /**
     * The icon of this item.
     */
    @Input({ required: true }) icon!: IconDefinition;

    /**
     * Invert the direction of this timeline item (right to left).
     */
    @Input() reverse = false;

    /**
     * The color class of this item.
     */
    @Input() color = '#ffffff';

    /**
     * Fired when the current item is extended.
     */
    @Output() extend = new EventEmitter<TimelineItemComponent>();

    /**
     * The host element's class attribute.
     */
    @HostBinding('class') protected get class(): string {
        return this.reverse ? 'justify-self-end lg:mr-24' : 'justify-self-start lg:ml-24';
    }

    /**
     * The host element's item color CSS variable.
     */
    @HostBinding('style.--item-color') protected get itemColor(): string {
        return this.color;
    }

    /**
     * The current item is extended.
     */
    protected extended = false;

    /**
     * Presumably unique ID used by ARIA attributes.
     */
    protected id: string = Math.random().toString(36).replace('0.', '');

    protected toggle(): void {
        if (this.extended) {
            this.close();
        } else {
            this.extended = true;
            this.extend.emit(this);
        }
    }

    close(): void {
        this.extended = false;
    }
}
