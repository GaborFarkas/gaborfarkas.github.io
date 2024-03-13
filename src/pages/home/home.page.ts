import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeroSceneComponent } from '../../components/hero-scene/hero-scene.component';
import { Hero } from '../../models/hero.model';

/**
 * Main content of the home (landing) page.
 */
@Component({
    selector: 'home-page',
    standalone: true,
    templateUrl: './home.page.html',
    imports: [CarouselComponent, HeroSceneComponent],
    styleUrl: './home.page.css'
})
export class HomePage {
    protected heroImg: string;

    constructor() {
        this.heroImg = localStorage.getItem('hero') || Hero.MALE;
    }

    /**
     * Toggles the hero image used in the hero animations.
     */
    toggleHero() {
        this.heroImg = this.heroImg === Hero.MALE ? Hero.FEMALE : Hero.MALE;
        localStorage.setItem('hero', this.heroImg);
    }
}
