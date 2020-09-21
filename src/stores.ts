import { writable } from "svelte/store";

import { Account } from "./Account";
import { AlphaVantageClient } from "./AlphaVantageClient";

export const inputAccount = writable<Account>(new Account());
export const outputAccount = writable<Account | null>(null);
export const alphaVantageClient = writable<AlphaVantageClient>(new AlphaVantageClient());