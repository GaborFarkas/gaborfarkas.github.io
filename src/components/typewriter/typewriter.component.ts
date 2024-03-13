import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Typewriter component for creating animated texts, outputting them character by character.
 */
@Component({
    selector: 'div.typewriter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './typewriter.component.html'
})
export class TypewriterComponent implements OnInit {
    /**
     * The text to write. If changed, the animation starts again.
     */
    @Input() textContent: string = '';

    /**
     * The total animation duration in ms.
     */
    @Input() duration: number = 0;

    /**
     * The current state of the output text.
     */
    protected currentText: string = '';

    /**
     * The array of characters to output.
     */
    private charArr: string[] = [];

    /**
     * The interval's key outputting new characters.
     */
    private intervalKey?: number;

    ngOnInit(): void {
        this.startAnimation();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['textContent']) {
            this.startAnimation();
        }
    }

    /**
     * Calculates, sets up, and starts the animation.
     */
    private startAnimation() {
        // Clean up previous run.
        if (this.intervalKey) {
            clearInterval(this.intervalKey);
            this.intervalKey = undefined;
        }
        this.charArr = [];
        this.currentText = '';

        if (this.textContent) {
            if (this.duration > 0) {
                // Calculate frequency.
                const msPerChar = Math.floor(this.duration / this.textContent.length);
                // Create an array with characters to add to the current state.
                this.charArr = this.textContent.split('').reverse();
                this.intervalKey = setInterval(function (this: TypewriterComponent) {
                    if (this.charArr.length) {
                        // Add a new character.
                        this.currentText += this.charArr.pop();
                    } else {
                        // Clean up interval, we don't need it anymore.
                        clearInterval(this.intervalKey);
                        this.intervalKey = undefined;
                    }
                }.bind(this), msPerChar) as unknown as number;
            } else {
                this.currentText = this.textContent;
            }
        }
    }
}
