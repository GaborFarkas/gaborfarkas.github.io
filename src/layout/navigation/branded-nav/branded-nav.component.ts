import { Component } from "@angular/core";
import { CompanyLogoComponent } from "@/layout/company-logo/company-logo.component";

/**
 * Branded navigation component
 */
@Component({
    selector: 'nav',
    standalone: true,
    templateUrl: './branded-nav.component.html',
    host: {
        'class': 'flex flex-row h-full items-center'
    },
    imports: [CompanyLogoComponent]
})
export class BrandedNavComponent {
}
