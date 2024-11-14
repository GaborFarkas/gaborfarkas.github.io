import { ElementWithData } from "@/models/element-with-data.model";
import { Directive, Input, ViewContainerRef } from "@angular/core";

/**
 * Directive for storing a single arbitrary value on the DOM model of an HTML element.
 */
@Directive({
    standalone: true,
    selector: '[dataValue]',
})
export class DataValueDirective {
    constructor(private readonly viewRef: ViewContainerRef) { }

    /**
     * The value to store.
     */
    @Input({ required: true }) set dataValue(value: any) {
        (this.viewRef.element.nativeElement as ElementWithData).dataValue = value;
    }
}
