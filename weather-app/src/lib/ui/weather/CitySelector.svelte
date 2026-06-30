<script lang="ts">
  import { page } from "$app/state";
  import { query } from "$lib/utils/url";
  import { toast } from "$lib/serv/toast";
  import Input from "$lib/ui/form/Input.svelte";

  const cities = ["London", "Tokyo", "New York", "Cape Town"];
  // The current city is the URL param, not a local $state variable.
  const selected = $derived(page.url.searchParams.get("city") ?? "Cape Town");

  let term = $state("");

  function submit() {
    const city = term.trim();
    if (!city) return;
    void query(page.url).set("city", city).go();
    toast(`Showing ${city}`);
    term = "";
  }
</script>

<nav class="cities">
  {#each cities as city (city)}
    <a
      href={query(page.url).set("city", city).href()}
      class:active={selected === city}
      data-sveltekit-noscroll>{city}</a
    >
  {/each}
</nav>

<div class="search">
  <Input
    bind:value={term}
    label="Add a city"
    name="city"
    placeholder="e.g. Berlin"
    onEnter={submit}
  />
  <button type="button" onclick={submit}>Search</button>
</div>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .cities {
    display: flex;
    gap: $space-sm;
    flex-wrap: wrap;
  }

  .search {
    display: flex;
    gap: $space-sm;
    align-items: flex-end;
    margin-top: $space-md;
  }

  a {
    padding: $space-xs $space-sm;
    border-radius: $radius-md;
    text-decoration: none;
    color: var(--color-text-soft);
  }

  a.active {
    background: var(--color-primary);
    color: #fff;
  }

  button {
    padding: $space-sm $space-md;
    border: 1px solid var(--color-border);
    border-radius: $radius-md;
    background: var(--color-primary);
    color: #fff;
    cursor: pointer;
  }
</style>
