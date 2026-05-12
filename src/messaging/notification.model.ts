/**
 * Describes a single notification.
 */
export interface NotificationModel {
    /**
     * The notification message.
     */
    message: string,

    /**
     * The notification's severity level.
     */
    level: NotificationLevel

    /**
     * Automatically close this notification after these many milliseconds.
     */
    fadeAfter?: number
};

export enum NotificationLevel {
    SUCCESS,
    ERROR,
    WARNING
};
