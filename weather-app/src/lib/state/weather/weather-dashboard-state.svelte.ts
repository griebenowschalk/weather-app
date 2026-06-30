import { page } from "$app/state";
import type { Status, Weather } from "$lib/def/weather";
import { currentWeather$, setCity } from "$lib/serv/weather";

export class WeatherDashboardState {
  weather = $state<Weather | null>(null);
  status = $state<Status>("initial");
  error = $state<unknown>(null);

  isLoading = $derived(this.status === "loading");
  cityName = $derived(this.weather?.location.name ?? "");
  feelsLike = $derived.by(() => this.weather?.current.feelslike_c ?? 0);

  constructor() {
    $effect(() => {
      const city = page.url.searchParams.get("city") ?? "Cape Town";
      this.status = "loading";
      setCity(city);
    });

    // Subscribe to the weather stream and copy values into $state.
    $effect(() => {
      const sub = currentWeather$.subscribe({
        next: (weather) => {
          this.weather = weather;
          this.status = "success";
        },
        error: (err) => {
          this.error = err;
          this.status = "error";
        },
      });
      return () => sub.unsubscribe();
    });
  }
}
