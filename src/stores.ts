import { writable } from "svelte/store";

import { Account } from "./Account.js";

export const inputAccount = writable<Account>(new Account());
export const outputAccount = writable<Account | null>(null);