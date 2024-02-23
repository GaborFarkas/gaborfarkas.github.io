import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

/**
 * Footer component.
 */
@Component({
    selector: 'footer',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    protected marker = faLocationDot;
    protected email = faEnvelope;
}
