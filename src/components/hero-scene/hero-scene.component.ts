import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { HeroScene } from '../../models/hero-scene.model';

/**
 * An animated hero scene used on the home page.
 */
@Component({
    selector: 'div.hero-scene',
    standalone: true,
    imports: [CommonModule, TypewriterComponent],
    templateUrl: './hero-scene.component.html',
    styleUrl: './hero-scene.component.css'
})
export class HeroSceneComponent {
    /**
     * Available hero scenes.
     */
    protected HeroScene = HeroScene;

    /**
     * The hero image used in the animation.
     */
    @Input() heroImg: string = '';

    /**
     * The scene of this animation.
     */
    @Input() heroScene: HeroScene = HeroScene.LONGTERM;

    /**
     * Fires an event when a hero change is requested.
     */
    @Output() heroChanged: EventEmitter<any> = new EventEmitter();

    /**
     * Gets or sets if the current hero is animating and cannot be clicked.
     */
    protected animating = false;

    /**
     * Gets the element reference of the scene's container div.
     */
    @ViewChild('sceneContainer') sceneContainer?: ElementRef<HTMLDivElement>;

    /**
     * Gets the component reference of all typewriter animations.
     */
    @ViewChildren(TypewriterComponent) private typewriters?: QueryList<TypewriterComponent>;

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

    /**
     * Restarts all animations of the current hero scene.
     */
    restart() {
        if (this.sceneContainer?.nativeElement) {
            // Restart CSS animations
            this.sceneContainer.nativeElement.style.display = 'none';
            setTimeout(function (this: HeroSceneComponent) {
                this.sceneContainer!.nativeElement.style.display = '';
            }.bind(this), 0);

            // Restart typewriter (JS) animations
            if (this.typewriters) {
                for (let typewriter of this.typewriters) {
                    typewriter.startAnimation();
                }
            }
        }
    }
}
