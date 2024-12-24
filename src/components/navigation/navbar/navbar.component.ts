import { Component, computed, signal } from '@angular/core';
import { NavDropdownComponent } from '../nav-dropdown/nav-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavDropdownGroup } from '../../../models/nav-dropdown.model';
import { CommonModule } from '@angular/common';
import { PageUrlMapping } from '../../../models/page-url-mapping.model';

/**
 * Navbar component.
 */
@Component({
    selector: 'nav.navbar',
    imports: [NavDropdownComponent, FontAwesomeModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    /**
     * Gets or sets if the navigation bar is expanded. Small screens only.
     */
    protected expanded = signal(false);

    /**
     * Gets the FA icon for the toggler button.
     */
    protected togglerIcon = computed(() => this.expanded() ? faXmark : faBars);

    /**
     * Gets or sets the navigation links for the website.
     */
    protected readonly navItems = signal<NavDropdownGroup[]>([
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
                { label: 'Feature matrix', url: `/${PageUrlMapping.FEATUREMATRIX}` },
                { label: 'CartoSandbox', url: `/${PageUrlMapping.SANDBOX}` }
            ]
        },
        {
            label: 'About',
            items: [
                { label: 'About me', url: `/${PageUrlMapping.ABOUT}` },
                { label: 'Publications', url: `/${PageUrlMapping.PUBLICATIONS}` }
            ]
        }
    ]);

    /**
     * Toggles the navigation bar. Small screens only.
     */
    protected toggle() {
        this.expanded.update(value => !value);
    }
}
