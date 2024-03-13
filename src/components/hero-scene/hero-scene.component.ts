import { Component } from '@angular/core';
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

}
