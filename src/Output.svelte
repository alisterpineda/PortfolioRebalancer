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

{#if $outputAccount != null}
{#each $outputAccount.positions as position}
{#if position.deltaQuantity > 0}
<p class="buy-result">Buy <b>{position.deltaQuantity}</b> units of <b>{position.symbol}</b></p>
<p class="extra-info">{position.quantity} &rarr; {position.quantity + position.deltaQuantity}</p>
<p class="extra-info">${position.getValue(false)} &rarr; ${position.getValue(true)}</p>
<p class="extra-info">{($outputAccount.getAllocation(position, false)*100).toFixed(2)}% &rarr; {($outputAccount.getAllocation(position, true)*100).toFixed(2)}% (target: {($outputAccount.getTargetAllocation(position)*100).toFixed(2)}%)</p>
{:else if position.deltaQuantity < 0}
<p class="sell-result">Sell <b>{Math.abs(position.deltaQuantity)}</b> units of <b>{position.symbol}</b></p>
<p class="extra-info">{position.quantity} &rarr; {position.quantity + position.deltaQuantity}</p>
<p class="extra-info">${position.getValue(false)} &rarr; ${position.getValue(true)}</p>
<p class="extra-info">{($outputAccount.getAllocation(position, false)*100).toFixed(2)}% &rarr; {($outputAccount.getAllocation(position, true)*100).toFixed(2)}% (target: {($outputAccount.getTargetAllocation(position)*100).toFixed(2)}%)</p>
{:else}
<p><b>{position.symbol}</b> stays the same</p>
<p class="extra-info">{position.quantity} &rarr; {position.quantity + position.deltaQuantity}</p>
<p class="extra-info">${position.getValue(false)} &rarr; ${position.getValue(true)}</p>
<p class="extra-info">{($outputAccount.getAllocation(position, false)*100).toFixed(2)}% &rarr; {($outputAccount.getAllocation(position, true)*100).toFixed(2)}% (target: {($outputAccount.getTargetAllocation(position)*100).toFixed(2)}%)</p>
{/if}
{/each}
<b>${($outputAccount.cash + $outputAccount.deltaCash).toFixed(2)}</b> in cash remaining
{/if}