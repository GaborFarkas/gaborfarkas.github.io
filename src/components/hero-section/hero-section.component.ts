import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orientation, ReferenceComponent } from '@/components/reference/reference.component';
import { ReferenceDescriptor } from '@/models/reference.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * A general hero section component highlighting key aspects of a service.
 */
@Component({
    selector: 'div.hero-section',
    standalone: true,
    imports: [CommonModule, ReferenceComponent, FontAwesomeModule],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
    /**
     * Flyout orientation for references.
     */
    protected Orientation = Orientation;

    /**
     * Background image URL.
     */
    @Input() background?: string = undefined;

    /**
     * Flip the background with the text.
     */
    @Input() flip: boolean = false;

    /**
     * The references of this hero section.
     */
    @Input() references: [ReferenceDescriptor|null, ReferenceDescriptor|null, ReferenceDescriptor|null] = [null, null, null];
}
