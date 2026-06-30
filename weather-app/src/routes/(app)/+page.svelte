<script lang="ts">
  import CitySelector from "$lib/ui/weather/CitySelector.svelte";
  import WeatherCard from "$lib/ui/weather/WeatherCard.svelte";
  import LoadingSpinner from "$lib/ui/shared/LoadingSpinner.svelte";
  import ErrorAlert from "$lib/ui/shared/ErrorAlert.svelte";
  import { WeatherDashboardState } from "$lib/state/weather/weather-dashboard-state.svelte";

  const dash = new WeatherDashboardState();
</script>

<CitySelector />

{#if dash.status === "loading"}
  <LoadingSpinner />
{:else if dash.status === "error"}
  <ErrorAlert message="Couldn't load weather. Try again." />
{:else if dash.weather}
  <WeatherCard weather={dash.weather} />
{/if}
