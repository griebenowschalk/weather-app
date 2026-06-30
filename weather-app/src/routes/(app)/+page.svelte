<script lang="ts">
  import CitySelector from "$lib/ui/weather/CitySelector.svelte";
  let { data } = $props();
</script>

<CitySelector />
<h1>{data.initial.location.name}</h1>
<p>{data.initial.current.condition.text} — {data.initial.current.temp_c}°C</p>
