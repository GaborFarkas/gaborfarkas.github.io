import { Component } from '@angular/core';
import { NavDropdownComponent } from '../nav-dropdown/nav-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavDropdownItem } from '../../models/nav-dropdown-item.model';
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
    protected navItems: Record<string, NavDropdownItem[]> = {
        'Counseling': [
            { label: 'Short-term counseling', url: '' },
            { label: 'Long-term partnership', url: '' }
        ],
        'Expertise': [
            { label: 'Research', url: '' },
            { label: 'Technologies', url: '' }
        ],
        'Playground': [
            { label: 'Web maps', url: '' }
        ]
    }

    /**
     * Toggles the navigation bar. Small screens only.
     */
    protected toggle() {
        this.expanded = !this.expanded;
    }
}
