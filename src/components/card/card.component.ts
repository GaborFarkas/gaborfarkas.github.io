import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

/**
 * A general card component with 2 faces, capable of flipping with an animation.
 */
@Component({
    selector: 'div.card',
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    host: {
        '[style.--item-color]': 'color()'
    }
})
export class CardComponent {
    /**
     * The color class of this item.
     */
    public color = input('#ffffff');

    /**
     * The card is flipped.
     */
    protected flipped = signal(false);

    /**
     * Event count counting the number of interactions with the card in a single flip session.
     */
    private evtCount = 0;

    /**
     * Event listener for the card mouse enter event.
     */
    protected onMouseEnter() {
        // The problem: when we click on a card using touch input, the mouseenter and the click events fire
        // simultaneously, and the card is not flipping on the first click as a result. Solved with these 2 listeners.

        // Reset the counter, mouse enters -> new session.
        this.evtCount = 0;
        this.flipped.set(true);
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
            this.flipped.update(value => !value);
        }
        this.evtCount++;
    }

    /**
     * Event listener for keyboard operation.
     */
    protected onKeypress(evt: KeyboardEvent) {
        // Act on the default activation keys (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role).
        if (evt.key === ' ' || evt.key === 'Enter') {
            this.flipped.update(value => !value);
        }
    }
}
