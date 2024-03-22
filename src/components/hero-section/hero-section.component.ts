import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A general hero section component highlighting key aspects of a service.
 */
@Component({
    selector: 'div.hero-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
    /**
     * Background image URL.
     */
    @Input() background?: string = undefined;

    /**
     * Flip the background with the text.
     */
    @Input() flip: boolean = false;
}
