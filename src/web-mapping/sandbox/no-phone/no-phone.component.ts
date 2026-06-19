import { Component, input, ChangeDetectionStrategy } from "@angular/core";

/**
 * A component for pages unavailable on small devices (e.g. phones).
 */
@Component({
    selector: 'div.no-phone',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './no-phone.component.html'
})
export class NoPhoneComponent {
    /**
     * Minimum device width for the functionality to work.
     */
    public minWidth = input.required<number>();
}
