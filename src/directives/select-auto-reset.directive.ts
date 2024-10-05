import { Directive, HostBinding, HostListener, Input } from "@angular/core";

/**
 * Directive for automatically reset a select element after a choice was made.
 */
@Directive({
    standalone: true,
    selector: 'select[reset]',
})
export class SelectAutoResetDirective {
    /**
     * Value of the default selected option.
     */
    @Input({ required: true }) reset!: string;

    /**
     * Binding of the current select value.
     */
    @HostBinding('value') value: string = this.reset;

    /**
     * Resets the value of the select element after each change by emptying a value and resetting it to the specified
     * default in async.
     */
    @HostListener('change')
    private resetSelectElement() {
        this.value = '';
        window.setTimeout(() => this.value = this.reset, 0);
    }
}
