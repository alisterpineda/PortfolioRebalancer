<script lang="ts" context="module">
    import { AlphaVantageClient } from "./AlphaVantageClient.js";
    export const client = new AlphaVantageClient();
</script>

<script lang="ts">
    import * as _ from "lodash";

    import { inputAccount, outputAccount } from "./stores.js";
    import { Notification } from "./Notification";
    import { Position } from "./Position.js";

    import NotificationItem from "./NotificationItem.svelte"
    import Output from "./Output.svelte";
    import PositionRow from "./PositionCardItem.svelte";

    let notifications: Notification[] = [];
    let isBuyOnly: boolean = false;
    let isCalculating: boolean = false;

    function onAddPosition() {
        $inputAccount.positions = [...$inputAccount.positions, new Position()];
    }

    function onRemovePosition(event: {type: string, detail?: any}) {
        $inputAccount.positions = $inputAccount.positions.filter((item) => item !== event.detail.position);
    }

    function createNotification(message: string){
        notifications = [...notifications, new Notification(message)];
    }

    function onDimissNotification(event: {type: string, detail?: any}) {
        notifications = notifications.filter((item) => item !== event.detail.notification)
    }

    function onComponentError(event: {type: string, detail?: any}) {
        createNotification(event.detail.message);
    }

    async function onCalculate() {
        try {
            isCalculating = true;
            $inputAccount.balance(isBuyOnly);
            $outputAccount = _.cloneDeep($inputAccount);
        } catch (error) {

        } finally {
            isCalculating = false;
        }
    }
</script>

<style>
    .container {
        margin-top: 3em;
        margin-bottom: 3em;
    }

    .notification-group {
        position: fixed;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
    }
</style>

<svelte:head>
    <style src="style.scss">

    </style>
</svelte:head>


<main>
    <div class="notification-group">
        {#each notifications as notification}
        <NotificationItem notification={notification} on:dismiss={onDimissNotification}/>
        {/each}
    </div>
    <section class="section">
        <div class="container">
            <h1 class="title">Portfolio Rebalancer</h1>
            <div class="columns">
                <div class="column is-half">
                    <div class="">
                        <h4 class="title is-4">Input</h4>
                        <div class="field">
                            <label class="label">API Key</label>
                            <div class="control">
                                <input
                                    class="input"
                                    type="text"
                                    bind:value={client.apiKey} />
                            </div>
                            <p class="help">
                                Used to fetch prices from Alpha Vantage. Get
                                your API key
                                <a
                                    href="https://www.alphavantage.co/support/#api-key"
                                    target="_blank">here</a>.
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Cash Balance</label>
                            <div class="control">
                                <input
                                    class="input"
                                    type="number"
                                    placeholder="e.g. 10400.80" 
                                    bind:value={$inputAccount.cash}/>
                            </div>
                        </div>
                        <div class="columns is-multiline">
                            {#each $inputAccount.positions as position}
                                <div class="column is-one-third">
                                    <PositionRow
                                        {position}
                                        on:delete={onRemovePosition}
                                        on:error={onComponentError} />
                                </div>
                            {/each}
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button
                                            class="button"
                                            on:click={onAddPosition}>
                                            Add Stock
                                        </button>
                                    </p>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="field is-grouped">
                                    <p class="control">
                                        <button class="button is-danger">
                                            Clear All
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <button class="button is-primary is-fullwidth" class:is-loading={isCalculating} on:click={onCalculate}>
                        Calculate
                    </button>
                    <label class="checkbox">
                        <input type="checkbox" bind:checked={isBuyOnly}/>
                        Buy Only
                    </label>
                </div>
                <div class="column is-half">
                    <div class="">
                        <h4 class="title is-4">Output</h4>
                        <Output/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
