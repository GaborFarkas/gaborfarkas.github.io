import { Directive, Input, TemplateRef } from "@angular/core";

/**
 * Directive for typing context variables in an ngTemplate.
 * Adapted from https://stackoverflow.com/questions/55458421/ng-template-typed-variable
 */
@Directive({
    standalone: true,
    selector: 'ng-template[types]',
})
export class TypedTemplateDirective<T> {
    /**
     * A possibly empty variable typed exactly as the template.
     * @example
     * // In component:
     * protected const templateTypes!: { title: string, count: number };
     * // In template
     * <ng-template let-title="title" let-count="count"></ng-template>
     */
    @Input({ required: true }) public types!: T;

    // the directive gets the template from Angular
    constructor(private contentTemplate: TemplateRef<T>) {
    }

    // this magic is how we tell Angular the context type for this directive, which then propagates down to the type of the template
    static ngTemplateContextGuard<T>(dir: TypedTemplateDirective<T>, ctx: unknown): ctx is T { return true; }
}
