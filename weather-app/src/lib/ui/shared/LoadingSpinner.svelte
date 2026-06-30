<div class="spinner" role="status" aria-label="Loading"></div>

<style lang="scss">
  @use '$scss/var/tokens' as *;

  .spinner {
    width: 28px;
    height: 28px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>