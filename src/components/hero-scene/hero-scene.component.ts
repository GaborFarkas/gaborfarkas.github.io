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
     * Event emitter used for a hero change.
     */
    @Output() heroChanged: EventEmitter<any> = new EventEmitter();

    /**
     * Toggles the hero image.
     */
    toggleHero() {
        this.heroChanged.emit();
    }
}
