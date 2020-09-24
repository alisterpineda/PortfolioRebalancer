import { Notification } from "./Notification";
import { notifications } from "./stores";

export class NotificationService {

    createNotification(message: string) {
        notifications.update(notifications => [...notifications, new Notification(message)]);
    }

    dismissNotification(notification: Notification) {
        notifications.update(notifications => notifications.filter((item) => item !== notification));
    }
}