<script lang="ts">
    import * as _ from "lodash";
    
    import { onMount } from "svelte";

    import { inputAccount, outputAccount, alphaVantageClient, notificationService } from "./stores";

    import { Notification } from "./Notification";
    import { Account } from "./Account";
    import { Position } from "./Position";

    import PositionRow from "./PositionCardItem.svelte";

    let isBuyOnly: boolean = false;
    let isCalculating: boolean = false;

    onMount(async () => {
        loadAccount();
    });

    function onAddPosition() {
        $inputAccount.positions = [...$inputAccount.positions, new Position()];
    }

    function onRemovePosition(event: {type: string, detail?: any}) {
        $inputAccount.positions = $inputAccount.positions.filter((item) => item !== event.detail.position);
    }

    async function onCalculate() {
        if (!isValidCalculation()) return;
        try {
            isCalculating = true;
            $inputAccount.balance(isBuyOnly);
            $outputAccount = _.cloneDeep($inputAccount);
            saveAccount();
        } catch (error) {
            console.log(`error: ${error}`);
        } finally {
            isCalculating = false;
        }
    }

    function loadAccount() {
        const cashJson = window.localStorage.getItem("accountCash");
        const positionsJson = window.localStorage.getItem("accountPositions");
        if (cashJson != null && positionsJson != null) {
            const cash: number = JSON.parse(cashJson);
            const positions: Position[] = JSON.parse(positionsJson);
            if (cash != null && positions != null) {
                $inputAccount = new Account();
                $inputAccount.cash = cash;
                for (var pos of positions) {
                    const newPos = new Position();
                    newPos.symbol = pos.symbol;
                    newPos.quantity = pos.quantity;
                    newPos.price = pos.price;
                    newPos.weight = pos.weight;
                    $inputAccount.positions = [...$inputAccount.positions, newPos];
                }
                console.log("Loaded account data from Local Storage");
            }
        }
    }

    function isValidCalculation(): boolean {
        if (isNaN($inputAccount.cash) ||  $inputAccount.cash < 0) {
            $notificationService.createNotification("'Cash Balance' must be a number that is greater than or equal to zero.");
            return false;
        }
        for (let position of $inputAccount.positions) {
            if (!position.symbol || position.symbol.length === 0) {
                $notificationService.createNotification("The symbol value of each stock position must not be empty.");
                return false;
            }
            if (position.quantity == null || isNaN(position.quantity) || position.quantity < 0) {
                $notificationService.createNotification(`The quantity of '${position.symbol}' must be a number that is greater than or equal to zero.`);
                return false;
            }
            if (position.price == null ||  isNaN(position.price) || position.price <= 0) {
                $notificationService.createNotification(`The price of '${position.symbol}' must be a number that is greater than zero.`);
                return false;
            }
            if (position.weight == null ||  isNaN(position.weight) || position.weight <= 0) {
                $notificationService.createNotification(`The weight of '${position.symbol}' must be a number that is greater than zero.`);
                return false;
            }
        }
        return true;
    }

    function saveAccount() {
        window.localStorage.setItem("accountCash", JSON.stringify($inputAccount.cash));
        window.localStorage.setItem("accountPositions", JSON.stringify($inputAccount.positions));
    }
</script>

<section class="section">
    <h4 class="title is-4">Input</h4>
    <div class="field">
        <label class="label">API Key</label>
        <div class="control">
            <input
                class="input"
                type="text"
                bind:value={$alphaVantageClient.apiKey} />
        </div>
        <p class="help">
            Optional. Used to fetch prices from Alpha Vantage. Get
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
                    on:delete={onRemovePosition}/>
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
    </div>
<hr />
<button class="button is-primary is-fullwidth" class:is-loading={isCalculating} on:click={onCalculate}>
    Calculate
</button>
<label class="checkbox">
    <input type="checkbox" bind:checked={isBuyOnly}/>
    Buy Only
</label>
</section>