<script lang="ts">
  type Props = {
    value: string;
    label: string;
    name: string;
    placeholder?: string;
    onEnter?: (value: string) => void;
  };
  let { value = $bindable(), label, name, placeholder, onEnter }: Props =
    $props();

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") onEnter?.(value);
  }
</script>

<label class="field">
  <span class="field-label">{label}</span>
  <input {name} {placeholder} bind:value onkeydown={onKeydown} />
</label>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .field {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  .field-label {
    font-size: $font-size-sm;
    color: var(--color-text-soft);
  }

  input {
    padding: $space-sm;
    border: 1px solid var(--color-border);
    border-radius: $radius-md;
    background: var(--color-bg);
    color: var(--color-text);
  }
</style>
