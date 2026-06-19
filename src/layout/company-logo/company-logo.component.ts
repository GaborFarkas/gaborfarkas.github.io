import { Component, input, ChangeDetectionStrategy } from "@angular/core";

/**
 * Company logo component
 */
@Component({
    selector: 'company-logo',
    standalone: true,
    templateUrl: './company-logo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './company-logo.component.css'
})
export class CompanyLogoComponent {
    /**
     * Class name of the SVG logo element
     */
    public svgClass = input();
}
