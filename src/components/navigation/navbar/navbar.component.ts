import { Component } from '@angular/core';
import { NavDropdownComponent } from '../nav-dropdown/nav-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavDropdownGroup } from '../../../models/nav-dropdown.model';
import { CommonModule } from '@angular/common';
import { PageUrlMapping } from '../../../models/page-url-mapping.model';

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
                { label: 'Long-term partnership', url: `/${PageUrlMapping.PARTNERSHIP}` },
                { label: 'Short-term counseling', url: `/${PageUrlMapping.COUNSELING}` }
            ]
        },
        {
            label: 'Web mapping',
            items: [
                { label: 'Feature matrix', url: `/${PageUrlMapping.FEATUREMATRIX}` }
            ]
        },
        {
            label: 'About',
            items: [
                { label: 'About me', url: `/${PageUrlMapping.ABOUT}` },
                { label: 'Publications', url: `/${PageUrlMapping.PUBLICATIONS}` }
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
