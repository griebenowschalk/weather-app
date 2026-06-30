<script lang="ts">
  import { toasts$, type Toast } from "$lib/serv/toast";

  let list = $state<Toast[]>([]);

  $effect(() => {
    const sub = toasts$.subscribe((t) => (list = t));
    return () => sub.unsubscribe();
  });
</script>

<div class="toaster" aria-live="polite">
  {#each list as t (t.id)}
    <div class="toast toast-{t.type}" role="status">{t.message}</div>
  {/each}
</div>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .toaster {
    position: fixed;
    right: $space-lg;
    bottom: $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    z-index: $z-toast;
  }

  .toast {
    padding: $space-sm $space-md;
    border-radius: $radius-md;
    color: #fff;
    background: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .toast-success {
    background: var(--color-success);
  }

  .toast-error {
    background: var(--color-danger);
  }

  .toast-info {
    background: var(--color-primary);
  }
</style>
