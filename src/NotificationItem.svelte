<script lang="ts">
    import { fly } from 'svelte/transition';
    import { notificationService } from "./stores";
    import type { Notification } from "./Notification";

    export let notification: Notification;

    function onDismiss() {
        $notificationService.dismissNotification(notification);
    }
</script>

<style>
    .notification-item {
        position: relative;
        padding-top: 0.5em;
    }
</style>

<div class="notification-item" in:fly="{{ y: 200, duration: 500 }}">
    <div class="notification is-danger">
        <button class="delete" on:click={onDismiss}></button>
        {notification.message}
    </div>
</div>
