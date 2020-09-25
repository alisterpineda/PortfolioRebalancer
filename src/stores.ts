import { readable, writable } from "svelte/store";

import type { Notification } from "./Notification";
import { NotificationService } from "./NotificationService";
import { Account } from "./Account";
import { AlphaVantageClient } from "./AlphaVantageClient";

export const inputAccount = writable<Account>(new Account());
export const outputAccount = writable<Account | null>(null);
export const alphaVantageClient = writable<AlphaVantageClient>(new AlphaVantageClient());
export const notificationService = readable<NotificationService>(new NotificationService(), function start(set) { return function stop() {}; });
export const notifications = writable<Notification[]>([]);
export const numberFormatter = readable<Intl.NumberFormat>(new Intl.NumberFormat('en-US', {style: 'decimal'}), function start(set) { return function stop() {}; });
export const currencyFormatter = readable<Intl.NumberFormat>(new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}), function start(set) { return function stop() {}; });
export const percentFormatter = readable<Intl.NumberFormat>(new Intl.NumberFormat('en-US', {style: 'percent'}), function start(set) { return function stop() {}; });