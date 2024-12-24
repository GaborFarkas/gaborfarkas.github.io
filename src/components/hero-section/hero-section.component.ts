import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orientation, ReferenceComponent } from '@/components/reference/reference.component';
import { ReferenceDescriptor } from '@/models/reference.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * A general hero section component highlighting key aspects of a service.
 */
@Component({
    selector: 'div.hero-section',
    imports: [CommonModule, ReferenceComponent, FontAwesomeModule],
    templateUrl: './hero-section.component.html',
    styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
    /**
     * Flyout orientation for references.
     */
    protected readonly Orientation = signal(Orientation).asReadonly();

    /**
     * Background image URL.
     */
    public background = input<string>();

    /**
     * Flip the background with the text.
     */
    public flip = input(false);

    /**
     * The references of this hero section.
     */
    public references = input<[ReferenceDescriptor|null, ReferenceDescriptor|null, ReferenceDescriptor|null]>([null, null, null]);
}
