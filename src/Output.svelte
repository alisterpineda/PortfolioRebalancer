<script lang="ts">
    import { account } from "./stores.js";
</script>

<style>
    .buy-result {
      color: green;
    }
  
    .sell-result {
      color: red;
    }
</style>

{#each $account.positions as position}
{#if position.deltaQuantity > 0}
<p class="buy-result">Buy <b>{position.deltaQuantity}</b> units of {position.symbol}</p>
{:else if position.deltaQuantity < 0}
<p class="sell-result">Sell <b>{Math.abs(position.deltaQuantity)}</b> units of {position.symbol}</p>
{:else}
{/if}
{/each}