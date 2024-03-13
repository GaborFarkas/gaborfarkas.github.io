import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * An animated hero scene used on the home page.
 */
@Component({
    selector: 'div.hero-scene',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-scene.component.html',
    styleUrl: './hero-scene.component.css'
})
export class HeroSceneComponent {
    /**
     * The hero image used in the animation.
     */
    @Input() heroImg: string = '';

    /**
     * Fires an event when a hero change is requested.
     */
    @Output() heroChanged: EventEmitter<any> = new EventEmitter();

    /**
     * Gets or sets if the current hero is animating and cannot be clicked.
     */
    protected animating = false;

    /**
     * Toggles the hero image.
     */
    toggleHero() {
        if (!this.animating) {
            this.animating = true;
            setTimeout(function (this: HeroSceneComponent) {
                this.heroChanged.emit();
                this.animating = false;
            }.bind(this), 500);
        }
    }
}
