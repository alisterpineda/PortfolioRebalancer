<script lang="ts">
    import { onMount } from "svelte";

    import { alphaVantageClient, notifications } from "./stores";

    import NotificationItem from "./NotificationItem.svelte";
    import InputPanel from "./InputPanel.svelte";
    import OutputPanel from "./OutputPanel.svelte";

    
    onMount(async () => {
        loadApiKey();
    });

    function loadApiKey() {
        const apiKeyJson = window.localStorage.getItem("apiKey");
        if (apiKeyJson != null) {
            const apiKey: string = JSON.parse(apiKeyJson);
            if (apiKey != null) {
                $alphaVantageClient.apiKey = apiKey;
                console.log("Loaded API key from Local Storage");
            }
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
    <title>Portfolio Rebalancer</title>
    <style src="style.scss">
    </style>
</svelte:head>


<main>
    <div class="notification-group">
        {#each $notifications as notification}
        <NotificationItem notification={notification}/>
        {/each}
    </div>
    <section class="section">
        <div class="container">
            <h1 class="title">Portfolio Rebalancer</h1>
            <div class="columns">
                <div class="column is-half">
                    <InputPanel/>
                </div>
                <div class="column is-half">
                    <OutputPanel/>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="content has-text-centered">
            <a class="button is-white fa-2x" href="https://github.com/alisterpineda/PortfolioRebalancer" target="_blank">
                <span class="icon">
                    <i class="fab fa-github"></i>
                </span>
            </a>
        </div>
    </footer>
</main>
