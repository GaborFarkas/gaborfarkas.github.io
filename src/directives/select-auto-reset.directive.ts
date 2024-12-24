import { Directive, input, OnInit, signal } from "@angular/core";

/**
 * Directive for automatically reset a select element after a choice was made.
 */
@Directive({
    standalone: true,
    selector: 'select[reset]',
    host: {
        '[value]': 'value()',
        '(change)': 'resetSelectElement()'
    }
})
export class SelectAutoResetDirective implements OnInit {

    /**
     * Value of the default selected option.
     */
    public reset = input.required<string>();

    /**
     * Binding of the current select value.
     */
    protected value = signal('');

    ngOnInit(): void {
        this.value.set(this.reset());
    }

    /**
     * Resets the value of the select element after each change by emptying a value and resetting it to the specified
     * default in async.
     */
    protected resetSelectElement(): void {
        this.value.set('');
        window.setTimeout(() => this.value.set(this.reset()), 0);
    }
}
