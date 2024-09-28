import { Component, Input } from "@angular/core";

/**
 * A component for pages unavailable on small devices (e.g. phones).
 */
@Component({
    selector: 'div.no-phone',
    standalone: true,
    templateUrl: './no-phone.component.html'
})
export class NoPhoneComponent {
    /**
     * Minimum device width for the functionality to work.
     */
    @Input({required: true}) public minWidth: number = 0;
}
