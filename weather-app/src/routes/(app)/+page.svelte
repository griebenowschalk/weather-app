<script lang="ts">
  import CitySelector from "$lib/ui/weather/CitySelector.svelte";
  import WeatherCard from "$lib/ui/weather/WeatherCard.svelte";
  let { data } = $props();
</script>

<CitySelector />
<WeatherCard weather={data.initial} />
