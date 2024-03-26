import { Component } from '@angular/core';
import { NavDropdownComponent } from '../nav-dropdown/nav-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavDropdownGroup } from '../../../models/nav-dropdown.model';
import { CommonModule } from '@angular/common';

/**
 * Navbar component.
 */
@Component({
    selector: 'nav.navbar',
    standalone: true,
    imports: [NavDropdownComponent, FontAwesomeModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    /**
     * Gets or sets if the navigation bar is expanded. Small screens only.
     */
    protected expanded: boolean = false;

    /**
     * Gets the FA icon for the toggler button.
     */
    protected get togglerIcon(): IconDefinition {
        return this.expanded ? faXmark : faBars;
    }

    /**
     * Gets or sets the navigation links for the website.
     */
    protected navItems: NavDropdownGroup[] = [
        {
            label: 'Counseling',
            items: [
                { label: 'Short-term counseling', url: '' },
                { label: 'Long-term partnership', url: '' }
            ]
        },
        {
            label: 'Expertise',
            items: [
                { label: 'Research', url: '' },
                { label: 'Technologies', url: '' }
            ]
        },
        {
            label: 'About',
            items: [
                { label: 'About', url: '/about' }
            ]
        }
    ]

    /**
     * Toggles the navigation bar. Small screens only.
     */
    protected toggle() {
        this.expanded = !this.expanded;
    }
}
