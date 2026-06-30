<script lang="ts">
    type Props = { message: string };
    let { message }: Props = $props();
  </script>
  
  <p class="error-alert" role="alert">{message}</p>
  
  <style lang="scss">
    @use '$scss/var/tokens' as *;

    .error-alert {
      padding: $space-sm $space-md;
      border-radius: $radius-md;
      background: var(--color-danger);
      color: #fff;
    }
  </style>