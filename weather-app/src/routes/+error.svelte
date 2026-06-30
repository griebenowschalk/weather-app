<script lang="ts">
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
</script>

<div class="error">
  <h1>{page.status}</h1>
  <p>{page.error?.message ?? "Something went wrong"}</p>
  <a href={resolve("/")}>Back to dashboard</a>
</div>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .error {
    text-align: center;
    padding: $space-2xl;
  }
</style>
