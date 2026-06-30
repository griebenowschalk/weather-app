<script lang="ts">
  import "$scss/main.scss";
  import { resolve } from "$app/paths";
  import { ThemeState } from "$lib/state/theme/theme-state.svelte";

  let { children } = $props();
  const theme = new ThemeState();
</script>

<header class="navbar">
  <a href={resolve("/")} class="navbar__logo">⛅ Weather</a>
  <button
    class="navbar__toggle"
    onclick={() => theme.toggle()}
    aria-label="Toggle dark mode"
  >
    {theme.isDark ? "☀️" : "🌙"}
  </button>
</header>

<main class="main">
  {@render children()}
</main>

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

  .navbar__logo {
    color: #fff;
    text-decoration: none;
    font-weight: $weight-bold;
  }

  .navbar__toggle {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    padding: $space-sm;
    border-radius: $radius-md;
    cursor: pointer;
  }

  .main {
    min-height: calc(100vh - 64px);
    background: var(--color-bg-soft);
  }
</style>
