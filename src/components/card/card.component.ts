import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

/**
 * A general card component with 2 faces, capable of flipping with an animation.
 */
@Component({
    selector: 'div.card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent {
    /**
     * The color class of this item.
     */
    @Input() color: string = '#ffffff';

    /**
     * The host element's item color CSS variable.
     */
    @HostBinding('style.--item-color') protected get itemColor(): string {
        return this.color;
    }

    /**
     * The card is flipped.
     */
    protected flipped: boolean = false;

    /**
     * Event count counting the number of interactions with the card in a single flip session.
     */
    private evtCount: number = 0;

    /**
     * Event listener for the card mouse enter event.
     */
    protected onMouseEnter() {
        // The problem: when we click on a card using touch input, the mouseenter and the click events fire
        // simultaneously, and the card is not flipping on the first click as a result. Solved with these 2 listeners.

        // Reset the counter, mouse enters -> new session.
        this.evtCount = 0;
        this.flipped = true;
        // Increase the counter after a few milliseconds so every deliberate click results in a flip.
        setTimeout(function (this: CardComponent) {
            this.evtCount++;
        }.bind(this), 10);
    }

    /**
     * Event listener for the card click event.
     */
    protected onClick() {
        // Filter out the mouseenter + click constellation to avoid flipping back instantly on the first flip.
        // As the counter is increased after 10ms, the first real click flips the card.
        if (this.evtCount > 0) {
            this.flipped = !this.flipped;
        }
        this.evtCount++;
    }
}