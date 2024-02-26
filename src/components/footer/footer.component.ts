import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FooterMapComponent } from '../footer-map/footer-map.component';

/**
 * Footer component.
 */
@Component({
    selector: 'footer',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, FooterMapComponent],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    /**
     * FA location marker icon.
     */
    protected marker: IconDefinition = faLocationDot;

    /**
     * FA email icon.
     */
    protected email: IconDefinition = faEnvelope;
}
