<script lang="ts">
  import type { Weather } from "$lib/def/weather";
  import LazyImage from "$lib/ui/shared/LazyImage.svelte";

  type Props = { weather: Weather };
  let { weather }: Props = $props();
</script>

<article class="card">
  <header class="card-head">
    <span class="card-icon">
      <LazyImage
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        eager
      />
    </span>
    <div>
      <h2 class="card-city">{weather.location.name}</h2>
      <p class="card-sub">{weather.location.country}</p>
    </div>
  </header>

  <p class="card-temp">{Math.round(weather.current.temp_c)}°C</p>
  <p class="card-cond">{weather.current.condition.text}</p>

  <dl class="card-meta">
    <div>
      <dt>Feels like</dt>
      <dd>{Math.round(weather.current.feelslike_c)}°C</dd>
    </div>
    <div>
      <dt>Humidity</dt>
      <dd>{weather.current.humidity}%</dd>
    </div>
    <div>
      <dt>Wind</dt>
      <dd>{Math.round(weather.current.wind_kph)} km/h</dd>
    </div>
  </dl>
</article>

<style lang="scss">
  @use "$scss/var/tokens" as *;

  .card {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
    min-width: 240px;
    padding: $space-lg;
    border: 1px solid var(--color-border);
    border-radius: $radius-lg;
    background: var(--color-bg);
    box-shadow: var(--shadow-sm);
  }

  .card-head {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  .card-icon {
    display: block;
    width: 48px;
  }

  .card-city {
    font-size: $font-size-lg;
  }

  .card-sub {
    font-size: $font-size-sm;
    color: var(--color-text-soft);
  }

  .card-temp {
    font-size: $font-size-3xl;
    font-weight: $weight-bold;
  }

  .card-cond {
    color: var(--color-text-soft);
  }

  .card-meta {
    display: flex;
    gap: $space-md;
    margin-top: $space-sm;
  }

  .card-meta dt {
    font-size: $font-size-sm;
    color: var(--color-text-soft);
  }

  .card-meta dd {
    font-weight: $weight-medium;
  }
</style>
