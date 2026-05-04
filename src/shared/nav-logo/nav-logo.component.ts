import { Component } from "@angular/core";

/**
 * Branded navigation component
 */
@Component({
    selector: 'nav',
    standalone: true,
    templateUrl: './nav-logo.component.html',
    host: {
        'class': 'flex flex-row h-full items-center'
    }
})
export class NavLogoComponent {
}
