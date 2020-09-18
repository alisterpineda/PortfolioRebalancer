<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from 'svelte/transition';
    import type { Notification } from "./Notification";

    const dispatch = createEventDispatcher();
    export let notification: Notification;

    function onDismiss() {
        dispatch("dismiss", {
            notification: notification
        });
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
