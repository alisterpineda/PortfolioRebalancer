<script lang="ts">
    import { outputAccount, numberFormatter, currencyFormatter, percentFormatter } from "./stores.js";
</script>

<style>
    .buy-result {
        color: green;
    }

    .sell-result {
        color: red;
    }
    .extra-info {
        padding-left: 1em;
        color: grey;
    }
</style>

<section class="section">
    <h4 class="title is-4">Output</h4>
    {#if $outputAccount != null}
        {#each $outputAccount.positions as position}
            {#if position.deltaQuantity > 0}
                <p class="buy-result">
                    Buy <b>{$numberFormatter.format(position.deltaQuantity)}</b> units of <b>{position.symbol}</b>
                </p>
            {:else if position.deltaQuantity < 0}
                <p class="sell-result">
                    Sell <b>{$numberFormatter.format(Math.abs(position.deltaQuantity))}</b> units of <b>{position.symbol}</b>
                </p>
            {:else}
                <p><b>{position.symbol}</b> stays the same</p>
            {/if}
            <p class="extra-info">
                {$numberFormatter.format(position.quantity)} &rarr; {$numberFormatter.format(position.quantity + position.deltaQuantity)}
            </p>
            <p class="extra-info">
                {$currencyFormatter.format(position.getValue(false))} &rarr; {$currencyFormatter.format(position.getValue(true))}
            </p>
            <p class="extra-info">
                {$percentFormatter.format($outputAccount.getAllocation(position, false))}
                &rarr; {$percentFormatter.format($outputAccount.getAllocation(position, true))}
                (target: {$percentFormatter.format($outputAccount.getTargetAllocation(position))})
            </p>
        {/each}
        <b>{$currencyFormatter.format($outputAccount.cash + $outputAccount.deltaCash)}</b> in
        cash remaining
    {:else}
        <article class="message">
            <div class="message-body">
                There is nothing to see here for now. <br />Fill out the
                relevant details under the Input panel and then click the
                "Calculate" button.
            </div>
        </article>
    {/if}
</section>
