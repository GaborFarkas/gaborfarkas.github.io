import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
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
    @Input() reverse: boolean = false;

    /**
     * Fired when the current item is extended.
     */
    @Output() extend: EventEmitter<TimelineItemComponent> = new EventEmitter();

    /**
     * The host element's class attribute.
     */
    @HostBinding('class') get class(): string {
        return this.reverse ? 'justify-self-end lg:mr-24' : 'justify-self-start lg:ml-24';
    }

    /**
     * The current item is extended.
     */
    protected extended: boolean = false;

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
