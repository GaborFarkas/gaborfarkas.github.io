import { FooterComponent } from "@/components/footer/footer.component";
import { ToastComponent } from "@/components/toast/toast.component";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { LayoutWithAnalytics } from "../layout-with-analytics";
import { NotificationService } from "@/services/notification.service";
import { NotificationModel } from "@/models/notification.model";
import { Subject, takeUntil } from "rxjs";

/**
 * Full-screen layout component containing a narrow footer at the bottom.
 * Analytics are enabled for this layout.
 */
@Component({
    selector: 'application-layout',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, ToastComponent],
    providers: [NotificationService],
    templateUrl: './application.layout.html',
    host: {
        'class': 'flex flex-col w-full h-full overflow-hidden'
    }
})
export class ApplicationLayout extends LayoutWithAnalytics implements OnInit, OnDestroy {
    constructor(private router_: Router,
        private notificationService: NotificationService) {
        super(router_);
    }

    /**
     * The list of notifications to display.
     */
    protected notifications: NotificationModel[] = [];

    /**
     * The current component is destroyed, do not subscribe to the notification service anymore from here.
     */
    private destroyed = new Subject<boolean>();

    ngOnInit(): void {
        this.notificationService.notifications.pipe(takeUntil(this.destroyed)).subscribe(value =>
            this.notifications = value);
    }

    ngOnDestroy(): void {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
