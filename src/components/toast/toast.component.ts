import { NotificationLevel, NotificationModel } from "@/models/notification.model";
import { NotificationService } from "@/services/notification.service";
import { Component, computed, input, signal } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Toast notification component. Does not have its own size and position.
 */
@Component({
    selector: 'div.toast',
    imports: [FontAwesomeModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent {
    constructor(private notificationService: NotificationService) { }

    /**
     * Close icon
     */
    protected readonly faXmark = signal(faXmark).asReadonly();

    /**
     * The background class name of the toast according to severity level.
     */
    protected backgroundClass = computed(() => {
        switch (this.notification().level) {
            case NotificationLevel.ERROR:
                return 'bg-red-400';
            case NotificationLevel.SUCCESS:
                return 'bg-green-500';
            case NotificationLevel.WARNING:
                return 'bg-yellow-500';
        }
    });

    /**
     * The notification to display.
     */
    public notification = input.required<NotificationModel>();

    /**
     * Closes the notification.
     */
    protected close() {
        this.notificationService.closeNotification(this.notification());
    }
}
