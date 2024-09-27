import { FooterComponent } from "@/components/footer/footer.component";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutWithAnalytics } from "../layout-with-analytics";

/**
 * Full-screen layout component containing a narrow footer at the bottom.
 * Analytics are enabled for this layout.
 */
@Component({
    selector: 'application-layout',
    standalone: true,
    imports: [RouterOutlet, FooterComponent],
    templateUrl: './application.layout.html',
    host: {
        'class': 'flex flex-col w-full h-full overflow-hidden'
    }
})
export class ApplicationLayout extends LayoutWithAnalytics { }
