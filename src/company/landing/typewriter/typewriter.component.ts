import { Component, OnDestroy, OnInit, SimpleChanges, OnChanges, input, signal } from '@angular/core';

/**
 * Typewriter component for creating animated texts, outputting them character by character.
 */
@Component({
    selector: 'div.typewriter',
    templateUrl: './typewriter.component.html'
})
export class TypewriterComponent implements OnInit, OnDestroy, OnChanges {
    /**
     * The text to write. If changed, the animation starts again.
     */
    public textContent = input('');

    /**
     * The total animation duration in ms.
     */
    public duration = input(0);

    /**
     * The delay the animation should start after in ms.
     */
    public delay = input(0);

    /**
     * Sets custom class names to the dynamic text element.
     */
    public textClass = input('');

    /**
     * The current state of the output text.
     */
    protected currentText = signal('');

    /**
     * The array of characters to output.
     */
    private charArr: string[] = [];

    /**
     * The interval's key outputting new characters.
     */
    private intervalKey?: number;

    /**
     * The delay timeout's key.
     */
    private delayKey?: number;

    ngOnInit(): void {
        this.startAnimation();
    }

    ngOnDestroy(): void {
        if (this.delayKey) {
            clearTimeout(this.delayKey);
        }
        if (this.intervalKey) {
            clearInterval(this.intervalKey);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['textContent']) {
            this.startAnimation();
        }
    }

    /**
     * Calculates, sets up, and starts the animation.
     */
    startAnimation() {
        // Clean up previous run.
        if (this.intervalKey) {
            clearInterval(this.intervalKey);
            this.intervalKey = undefined;
        }
        if (this.delayKey) {
            clearTimeout(this.delayKey);
            this.delayKey = undefined;
        }
        this.charArr = [];
        this.currentText.set('');

        if (this.textContent()) {
            this.delayKey = setTimeout(function (this: TypewriterComponent) {
                this.delayKey = undefined;

                if (this.duration() > 0) {
                    // Calculate frequency.
                    const msPerChar = Math.floor(this.duration() / this.textContent().length);
                    // Create an array with characters to add to the current state.
                    this.charArr = this.textContent().split('').reverse();
                    this.intervalKey = setInterval(function (this: TypewriterComponent) {
                        if (this.charArr.length) {
                            // Add a new character.
                            this.currentText.update(value => value + this.charArr.pop());
                        } else {
                            // Clean up interval, we don't need it anymore.
                            clearInterval(this.intervalKey);
                            this.intervalKey = undefined;
                        }
                    }.bind(this), msPerChar) as unknown as number;
                } else {
                    this.currentText.set(this.textContent());
                }
            }.bind(this), this.delay()) as unknown as number;
        }
    }
}
