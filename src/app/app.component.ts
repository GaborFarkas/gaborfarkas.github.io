import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@/components/navigation/navbar/navbar.component';
import { FooterComponent } from '@/components/footer/footer.component';
import { filter } from 'rxjs';
import { analytics } from '@/utils/analytics';

/**
 * Root application component.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private router: Router) {
        // Trigger a page view after each successful router navigation.
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_ => {
            analytics.page();
        });
    }
}
