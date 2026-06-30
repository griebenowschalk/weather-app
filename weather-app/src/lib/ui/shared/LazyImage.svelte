<script lang="ts">
  type Props = {
    src: string;
    alt: string;
    eager?: boolean;
  };
  let { src, alt, eager = false }: Props = $props();

  // WeatherAPI icons are protocol-relative (//cdn...) — normalise to https.
  const url = $derived(src.startsWith("//") ? `https:${src}` : src);
</script>

<img {alt} src={url} loading={eager ? "eager" : "lazy"} decoding="async" />

<style lang="scss">
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
