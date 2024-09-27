import { analytics } from "@/utils/analytics";
import { Directive, isDevMode } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

/**
 * Base class for layout components collecting usage data.
 */
@Directive()
export class LayoutWithAnalytics {
    constructor(private router: Router) {
        // Trigger a page view after each successful router navigation.
        if (!isDevMode()) {
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_ => {
                analytics.page();
            });
        }
    }
}
