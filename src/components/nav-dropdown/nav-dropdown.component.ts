import { Component, Input } from '@angular/core';
import { NavDropdownItem } from '../../models/nav-dropdown-item.model';
import { CommonModule } from '@angular/common';

/**
 * Dropdown component for the navigation bar.
 */
@Component({
    selector: 'nav-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-dropdown.component.html',
    styleUrl: './nav-dropdown.component.css'
})
export class NavDropdownComponent {
    /**
     * Label of the dropdown menu.
     */
    @Input() label: string | undefined = undefined;

    /**
     * Dropdown content.
     */
    @Input() items: NavDropdownItem[] = [];

    /**
     * Gets or sets if the dropdown menu is expanded. Large screens only.
     */
    protected expanded: boolean = false;
}
