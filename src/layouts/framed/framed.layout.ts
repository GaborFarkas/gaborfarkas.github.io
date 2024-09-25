import { FooterComponent } from "@/components/footer/footer.component";
import { NavbarComponent } from "@/components/navigation/navbar/navbar.component";
import { analytics } from "@/utils/analytics";
import { Component, isDevMode } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

/**
 * Layout component containing a navigation bar at the top and a footer at the bottom.
 * Analytics are only enabled for this layout.
 */
@Component({
    selector: 'framed-layout',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './framed.layout.html'
})
export class FramedLayout {
    constructor(private router: Router) {
        // Trigger a page view after each successful router navigation.
        if (!isDevMode()) {
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_ => {
                analytics.page();
            });
        }
    }
}
