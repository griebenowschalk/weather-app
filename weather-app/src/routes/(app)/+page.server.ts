import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { Weather } from "$lib/def/weather";
import { apiBase, apiKey } from "$lib/serv/core/env.server";

export const load: PageServerLoad = async ({ url, fetch }) => {
  // The selected city is read from the URL.
  const city = url.searchParams.get("city")?.trim() || "Cape Town";

  const res = await fetch(
    `${apiBase}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`,
  );
  if (!res.ok) throw error(500, "Failed to load initial weather");

  const data = await res.json();
  const initial: Weather = {
    location: data.location,
    current: data.current,
    fetchedAt: new Date().toISOString(),
  };
  return { initial };
};
