<script lang="ts">
  import "$scss/main.scss";
  import { resolve } from "$app/paths";
  import { ThemeState } from "$lib/state/theme/theme-state.svelte";
  import GlobalLoader from "$lib/ui/shared/GlobalLoader.svelte";
  import Toaster from "$lib/ui/shared/Toaster.svelte";

  let { children } = $props();
  const theme = new ThemeState();
</script>

<GlobalLoader />

<header class="navbar">
  <a href={resolve("/")} class="navbar-logo">⛅ Weather</a>
  <button
    class="navbar-toggle"
    onclick={() => theme.toggle()}
    aria-label="Toggle dark mode"
  >
    {theme.isDark ? "☀️" : "🌙"}
  </button>
</header>

<main class="main">
  {@render children()}
</main>

<Toaster />

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-md $space-lg;
    background: var(--color-primary);
    color: #fff;
    position: sticky;
    top: 0;
    z-index: $z-sticky;
  }

  .navbar-logo {
    color: #fff;
    text-decoration: none;
    font-weight: $weight-bold;
  }

  .navbar-toggle {
    background: rgb(255 255 255 / 20%);
    border: 1px solid rgb(255 255 255 / 30%);
    color: #fff;
    padding: $space-sm;
    border-radius: $radius-md;
    cursor: pointer;
  }

  .main {
    min-height: calc(100vh - 64px);
    background: var(--color-bg-soft);
    padding: $space-md $space-lg;
    gap: $space-md;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>
