<script lang="ts" generics="Item">
  import type { Snippet } from "svelte";
  import type { Cache } from "$lib/serv/core/cache";

  type Props = {
    cache: Cache<Item[]>;
    item: Snippet<[Item]>;
    empty?: Snippet;
  };
  let { cache, item, empty }: Props = $props();
</script>

{#if cache.loading}
  <div class="rail-msg">Loading…</div>
{:else if cache.error}
  <div class="rail-msg">Couldn't load.</div>
{:else if cache.payload?.length}
  <div class="rail">
    {#each cache.payload ?? [] as it, i (i)}
      <div class="rail-cell">{@render item(it)}</div>
    {/each}
  </div>
{:else}
  {@render empty?.()}
{/if}

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .rail {
    display: flex;
    gap: $space-md;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .rail-cell {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  .rail-msg {
    padding: $space-md;
    color: var(--color-text-soft);
  }
</style>
