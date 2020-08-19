<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Position } from "./Position";
    import { client } from "./App.svelte";

    const dispatch = createEventDispatcher();
    export let position: Position;

    let isFetchingPrice: boolean = false;

    function onDelete() {
        dispatch("delete", {
            position: position,
        });
    }

    async function onFetchPrice() {
        isFetchingPrice = true;
        try {
            position.price = await client.fetchPrice(position.symbol);
        } catch (error) {
            console.error(error);
        } finally {
            isFetchingPrice = false;
        }
    }
</script>

<style>
  .buy-result {
    color: green;
  }

  .sell-result {
    color: red;
  }
</style>

<div class="box">
    <button class="delete is-pulled-right" on:click={onDelete}></button>
    <div class="field">
        <label class="label is-small">Symbol</label>
        <div class="control">
          <input class="input is-small" type="text" placeholder="e.g. IBM" bind:value={position.symbol}>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Quantity</label>
        <div class="control">
          <input class="input is-small" type="number" placeholder="e.g. 7" bind:value={position.quantity}>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Price</label>
        <div class="field has-addons">
            <div class="control">
                <input class="input is-small" type="number" placeholder="e.g. 143.39" bind:value={position.price}>
              </div>
              <div class="control">
                  <button class="button is-small" class:is-loading="{isFetchingPrice}" on:click={onFetchPrice}>
                      <span class="icon is-small">
                          <i class="fas fa-sync"></i>
                      </span>
                  </button>
              </div>
        </div>
        
      </div>
      <div class="field">
        <label class="label is-small">Weight</label>
        <div class="control">
          <input class="input is-small" type="number" placeholder="e.g. 20" bind:value={position.weight}>
        </div>
      </div>
      <hr>
      <div class="has-text-centered">
      {#if position.deltaQuantity > 0}
      <p class="buy-result">BUY <b>{position.deltaQuantity}</b></p>
      {:else if position.deltaQuantity < 0}
      <p class="sell-result">SELL <b>{Math.abs(position.deltaQuantity)}</b></p>
      {:else}
      ---
      {/if}
      </div>
    
</div>
