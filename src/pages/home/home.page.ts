import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeroSceneComponent } from '../../components/hero-scene/hero-scene.component';

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
}
