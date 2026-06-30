import type { Weather } from "$lib/def/weather";
import {
  BehaviorSubject,
  shareReplay,
  switchMap,
  type Observable,
} from "rxjs";
import { get$ } from "./core/http";

// One-shot fetch for a single city.
export function fetchWeather$(city: string): Observable<Weather> {
  const q = encodeURIComponent(city);
  return get$<Weather>(`/api/weather?city=${q}`);
}

// --- Selected-city stream ---
const selectedCity$ = new BehaviorSubject<string>("Cape Town");

export function setCity(city: string): void {
  selectedCity$.next(city);
}

// switchMap cancels the previous request when the city changes;
// shareReplay(1) shares one fetch across all subscribers.
export const currentWeather$: Observable<Weather> = selectedCity$.pipe(
  switchMap((city) => fetchWeather$(city)),
  shareReplay(1),
);
