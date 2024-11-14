import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NavDropdownItem } from '@/models/nav-dropdown.model';
import { CommonModule } from '@angular/common';

/**
 * Dropdown component for the navigation bar.
 * Only use inside {@link NavbarComponent}.
 */
@Component({
    selector: 'nav-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './nav-dropdown.component.html',
    styleUrl: './nav-dropdown.component.css'
})
export class NavDropdownComponent implements AfterViewInit {
    /**
     * Label of the dropdown menu.
     */
    @Input() label: string | undefined = undefined;

    /**
     * Dropdown content.
     */
    @Input() items: NavDropdownItem[] = [];

    /**
     * The accessibility target element of the dropdown menu for keyboard users.
     */
    @ViewChild('ariaTarget') private ariaTarget?: ElementRef<HTMLDivElement>;

    /**
     * Gets or sets if the dropdown menu is expanded. Large screens only.
     */
    protected expanded = false;

    public ngAfterViewInit() {
        this.ariaTarget?.nativeElement.addEventListener('keypress', function (this: NavDropdownComponent, evt: KeyboardEvent) {
            if (evt.key === ' ') {
                this.expanded = !this.expanded;
            }
        }.bind(this));
    }
}
