import { Component, input, signal } from '@angular/core';
import { NavDropdownItem } from '@/models/nav-dropdown.model';
import { CommonModule } from '@angular/common';

/**
 * Dropdown component for the navigation bar.
 * Only use inside {@link NavbarComponent}.
 */
@Component({
    selector: 'nav-dropdown',
    imports: [CommonModule],
    templateUrl: './nav-dropdown.component.html',
    styleUrl: './nav-dropdown.component.css'
})
export class NavDropdownComponent {
    /**
     * Label of the dropdown menu.
     */
    public label = input();

    /**
     * Dropdown content.
     */
    public items = input<NavDropdownItem[]>([]);

    /**
     * Gets or sets if the dropdown menu is expanded. Large screens only.
     */
    protected expanded = signal(false);

    protected onKeyPress(evt: KeyboardEvent) {
        if (evt.key === ' ' || evt.key === 'Enter') {
            this.expanded.update(value => !value);
        }
    }
}
