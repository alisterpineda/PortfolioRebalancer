<script lang="ts" context="module">
    import { Account } from "./Account.js";
    import { AlphaVantageClient } from "./AlphaVantageClient.js";
    export const client = new AlphaVantageClient();
</script>

<script lang="ts">
    import { Position } from "./Position.js";

    import PositionRow from "./PositionCardItem.svelte";

    let account: Account = new Account();
    let isBuyOnly: boolean = false;
    let isCalculating: boolean = false;

    function onAddPosition() {
        account.positions = [...account.positions, new Position()];
    }

    function onRemovePosition(event: {type: string, detail?: any}) {
        account.positions = account.positions.filter((item) => item !== event.detail.position);
    }

    function onCalculate() {
        try {
            isCalculating = true;
            account.balance(isBuyOnly);
            account.positions = account.positions;
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
</style>

<svelte:head>
    <style src="style.scss">

    </style>
</svelte:head>


<main>
    <section class="section">
        <div class="container">
            <h1 class="title">Portfolio Rebalancer</h1>

            <div class="columns">
                <div class="column is-half">
                    <div class="">
                        <h4 class="title is-4">Data</h4>
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
                                    bind:value={account.cash}/>
                            </div>
                        </div>
                        <div class="columns is-multiline">
                            {#each account.positions as position}
                                <div class="column is-one-third">
                                    <PositionRow
                                        {position}
                                        on:delete={onRemovePosition} />
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
                        <h4 class="title is-4">Graph</h4>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>
