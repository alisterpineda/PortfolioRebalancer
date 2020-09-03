import { writable } from "svelte/store";

import { Account } from "./Account.js";

export const account = writable<Account>(new Account());