<script lang="ts">
  import type { Snippet } from "svelte";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import type { RouteIdWithSearchOrHash } from "$app/types";
  import { deregisterModal, registerModal } from "$lib/serv/modal";

  type Props = {
    title?: string;
    onClose?: () => void;
    hrefClose?: RouteIdWithSearchOrHash; // if set, closing navigates (anchor) instead of calling onClose
    children: Snippet;
  };
  let { title, onClose, hrefClose, children }: Props = $props();

  let dialog = $state<HTMLDivElement>();

  function close() {
    if (hrefClose) {
      void goto(resolve(hrefClose));
    } else {
      onClose?.();
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") return close();
    if (e.key === "Tab" && dialog) {
      const nodes = [
        ...dialog.querySelectorAll<HTMLElement>("a,button,input,[tabindex]"),
      ].filter((n) => n.tabIndex >= 0);
      if (!nodes.length) return;
      let i = nodes.indexOf(document.activeElement as HTMLElement);
      i = (i + (e.shiftKey ? -1 : 1) + nodes.length) % nodes.length;
      nodes[i].focus();
      e.preventDefault();
    }
  }

  $effect(() => {
    registerModal(close);
    return () => deregisterModal(close);
  });
</script>

<svelte:window onkeydown={onKeydown} />

{#if hrefClose}
  <a href={resolve(hrefClose)} class="backdrop" aria-label="Close"></a>
{:else}
  <button class="backdrop" aria-label="Close" onclick={() => onClose?.()}
  ></button>
{/if}

<div class="modal" role="dialog" aria-modal="true" bind:this={dialog}>
  {#if title}<h2>{title}</h2>{/if}
  {@render children()}
</div>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 40%);
    border: 0;
  }

  .modal {
    position: fixed;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    background: var(--color-bg);
    padding: $space-lg;
    border-radius: $radius-lg;
    z-index: $z-modal;
    box-shadow: var(--shadow-md);
  }
</style>
