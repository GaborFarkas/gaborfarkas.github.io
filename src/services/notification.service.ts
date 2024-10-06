import { NotificationModel } from "@/models/notification.model";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

/**
 * Service for collecting and displaying notifications to the user.
 */
@Injectable({
    providedIn: "root"
})
export class NotificationService {
    constructor() {
        this.updateObservable();
    }

    /**
     * The current list of displayed notifications.
     */
    public notifications: Observable<NotificationModel[]> = new ReplaySubject();

    /**
     * Internal list of current notifications.
     */
    private notifications_: NotificationModel[] = [];

    public showNotification(notification: NotificationModel) {
        if (!this.notifications_.includes(notification)) {
            this.notifications_.push(notification);
            this.updateObservable();

            if (notification.fadeAfter !== undefined) {
                window.setTimeout(() => this.closeNotification(notification), notification.fadeAfter);
            }
        }

    }

    public closeNotification(notification: NotificationModel) {
        if (this.notifications_.includes(notification)) {
            this.notifications_ = this.notifications_.filter(currNotification =>
                notification !== currNotification);
            this.updateObservable();
        }
    }

    /**
     * Updates the publicly observable list of notifications.
     */
    private updateObservable() {
        (this.notifications as ReplaySubject<NotificationModel[]>).next(this.notifications_);
    }
}
