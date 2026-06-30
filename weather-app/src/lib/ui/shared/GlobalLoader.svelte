<script lang="ts">
  import { fetchCount$ } from "$lib/serv/core/http";

  let active = $state(0);

  $effect(() => {
    const sub = fetchCount$.subscribe((n) => (active = n));
    return () => sub.unsubscribe();
  });
</script>

{#if active > 0}
  <div class="global-loader" role="progressbar" aria-label="Loading"></div>
{/if}

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .global-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--color-primary);
    z-index: $z-loader;
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
</style>
