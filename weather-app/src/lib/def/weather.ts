export type WeatherLocation = {
  name: string;
  region: string;
  country: string;
};

export type WeatherCurrent = {
  temp_c: number;
  condition: { text: string; icon: string; code: number };
  humidity: number;
  wind_kph: number;
  feelslike_c: number;
};

export type Weather = {
  location: WeatherLocation;
  current: WeatherCurrent;
  fetchedAt: string;
};

// The standard async-state shape used across the app (mirrors work).
export type Status = "initial" | "loading" | "success" | "error";

// Runtime type guard for validating API responses at boundaries.
export function isWeather(data: unknown): data is Weather {
  return (
    typeof data === "object" &&
    data !== null &&
    "location" in data &&
    "current" in data
  );
}
