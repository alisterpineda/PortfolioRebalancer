<script lang="ts">
    import { outputAccount } from "./stores.js";
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
                    Buy <b>{position.deltaQuantity}</b> units of <b>{position.symbol}</b>
                </p>
                <p class="extra-info">
                    {position.quantity} &rarr; {position.quantity + position.deltaQuantity}
                </p>
                <p class="extra-info">
                    ${position.getValue(false).toFixed(2)} &rarr; ${position.getValue(true).toFixed(2)}
                </p>
                <p class="extra-info">
                    {($outputAccount.getAllocation(position, false) * 100).toFixed(2)}%
                    &rarr; {($outputAccount.getAllocation(position, true) * 100).toFixed(2)}%
                    (target: {($outputAccount.getTargetAllocation(position) * 100).toFixed(2)}%)
                </p>
            {:else if position.deltaQuantity < 0}
                <p class="sell-result">
                    Sell <b>{Math.abs(position.deltaQuantity)}</b> units of <b>{position.symbol}</b>
                </p>
                <p class="extra-info">
                    {position.quantity} &rarr; {position.quantity + position.deltaQuantity}
                </p>
                <p class="extra-info">
                    ${position.getValue(false).toFixed(2)} &rarr; ${position.getValue(true).toFixed(2)}
                </p>
                <p class="extra-info">
                    {($outputAccount.getAllocation(position, false) * 100).toFixed(2)}%
                    &rarr; {($outputAccount.getAllocation(position, true) * 100).toFixed(2)}%
                    (target: {($outputAccount.getTargetAllocation(position) * 100).toFixed(2)}%)
                </p>
            {:else}
                <p><b>{position.symbol}</b> stays the same</p>
                <p class="extra-info">
                    {position.quantity} &rarr; {position.quantity + position.deltaQuantity}
                </p>
                <p class="extra-info">
                    ${position.getValue(false).toFixed(2)} &rarr; ${position.getValue(true).toFixed(2)}
                </p>
                <p class="extra-info">
                    {($outputAccount.getAllocation(position, false) * 100).toFixed(2)}%
                    &rarr; {($outputAccount.getAllocation(position, true) * 100).toFixed(2)}%
                    (target: {($outputAccount.getTargetAllocation(position) * 100).toFixed(2)}%)
                </p>
            {/if}
        {/each}
        <b>${($outputAccount.cash + $outputAccount.deltaCash).toFixed(2)}</b> in
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
