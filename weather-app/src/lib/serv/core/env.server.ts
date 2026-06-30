// .server.ts — never imported from client code.
import { WEATHER_API_KEY } from '$env/static/private';
import { PUBLIC_WEATHER_API_BASE } from '$env/static/public';

export const apiKey = WEATHER_API_KEY;
export const apiBase = PUBLIC_WEATHER_API_BASE;