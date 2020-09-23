<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { alphaVantageClient } from "./stores";
    import type { Position } from "./Position";

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
            position.price = await $alphaVantageClient.fetchPrice(position.symbol);
        } catch (error) {
            console.error(error);
            dispatch("error", {
              message: error
            })
        } finally {
            isFetchingPrice = false;
        }
    }
</script>

<div class="box">
    <button class="delete is-pulled-right" on:click={onDelete}></button>
    <div class="field">
        <label class="label is-small">Symbol</label>
        <div class="control">
          <input class="input is-small" type="text" placeholder="e.g. IBM" bind:value={position.symbol}>
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Units Owned</label>
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
</div>
