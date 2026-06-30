import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { apiBase, apiKey } from "$lib/serv/core/env.server";

export const GET: RequestHandler = async ({ url, fetch }) => {
  // Validate input at the server boundary (web-security skill).
  const city = url.searchParams.get("city")?.trim();
  if (!city || city.length > 64) {
    throw error(400, "Invalid city");
  }

  const res = await fetch(
    `${apiBase}/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`,
  );
  if (!res.ok) {
    // Don't leak upstream details to the client.
    throw error(502, "Weather provider unavailable");
  }

  const data = await res.json();
  return json({
    location: data.location,
    current: data.current,
    fetchedAt: new Date().toISOString(),
  });
};
