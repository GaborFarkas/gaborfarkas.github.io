import { FooterComponent } from "@/components/footer/footer.component";
import { NavbarComponent } from "@/components/navigation/navbar/navbar.component";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutWithAnalytics } from "../layout-with-analytics";

/**
 * Layout component containing a navigation bar at the top and a footer at the bottom.
 * Analytics are enabled for this layout.
 */
@Component({
    selector: 'framed-layout',
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './framed.layout.html'
})
export class FramedLayout extends LayoutWithAnalytics { }
