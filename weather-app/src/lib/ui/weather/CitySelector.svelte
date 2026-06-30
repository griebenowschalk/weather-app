<script lang="ts">
  import { page } from "$app/state";
  import { query } from "$lib/utils/url";

  const cities = ["London", "Tokyo", "New York", "Cape Town"];
  // The current city is the URL param, not a local $state variable.
  const selected = $derived(page.url.searchParams.get("city") ?? "Cape Town");

  let term = $state("");

  function search(e: SubmitEvent) {
    e.preventDefault();
    if (term.trim()) query(page.url).set("city", term.trim()).go();
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

<form onsubmit={search}>
  <input bind:value={term} placeholder="Add a city" aria-label="City" />
  <button type="submit">Search</button>
</form>

<style lang="scss">
  @use "$scss/var/tokens" as *;
  .cities {
    display: flex;
    gap: $space-sm;
    flex-wrap: wrap;
  }
  .search {
    display: flex;
    gap: $space-xs;
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
</style>
