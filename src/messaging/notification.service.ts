import { NotificationLevel, NotificationModel } from "@/messaging/notification.model";
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
    private notificationList: NotificationModel[] = [];

    /**
     * Shows a new notification.
     * @param notification The notification descriptor.
     */
    public showNotification(notification: NotificationModel) {
        if (!this.notificationList.includes(notification)) {
            this.notificationList.push(notification);
            this.updateObservable();

            if (notification.fadeAfter !== undefined) {
                window.setTimeout(() => this.closeNotification(notification), notification.fadeAfter);
            }
        }

    }

    /**
     * Closes a shown notification.
     * @param notification The notification descriptor.
     */
    public closeNotification(notification: NotificationModel) {
        if (this.notificationList.includes(notification)) {
            this.notificationList = this.notificationList.filter(currNotification =>
                notification !== currNotification);
            this.updateObservable();
        }
    }

    /**
     * Shows a success notification.
     * @param message The notification message.
     * @param fadeAfter Automatically close this notification after these many milliseconds.
     */
    public showSuccess(message: string, fadeAfter?: number) {
        this.showNotification({
            level: NotificationLevel.SUCCESS,
            message,
            fadeAfter
        });
    }

    /**
     * Shows a warning notification.
     * @param message The notification message.
     * @param fadeAfter Automatically close this notification after these many milliseconds.
     */
    public showWarning(message: string, fadeAfter?: number) {
        this.showNotification({
            level: NotificationLevel.WARNING,
            message,
            fadeAfter
        });
    }

    /**
     * Shows an error notification.
     * @param message The notification message.
     * @param fadeAfter Automatically close this notification after these many milliseconds.
     */
    public showError(message: string, fadeAfter?: number) {
        this.showNotification({
            level: NotificationLevel.ERROR,
            message,
            fadeAfter
        });
    }

    /**
     * Updates the publicly observable list of notifications.
     */
    private updateObservable() {
        (this.notifications as ReplaySubject<NotificationModel[]>).next(this.notificationList);
    }
}
