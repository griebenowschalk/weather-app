# Weather App

A weather dashboard built with SvelteKit 2, Svelte 5 (runes), and RxJS. The selected city lives in
the URL (`?city=`), so the dashboard is shareable, bookmarkable, and SSR-friendly out of the box.

## Features

- City search and quick-select with the current city reflected in the URL
- Current conditions card with live data from [WeatherAPI](https://www.weatherapi.com/)
- Light/dark theme toggle
- Toast notifications, a global loading indicator, modals, and a lazy-loading image component
- Server-side rendering with a thin API proxy route that keeps the API key off the client

## Project structure

The app itself lives in [`weather-app/`](weather-app/) — run all npm commands from there.

```
weather-app/src/
├── lib/
│   ├── def/       # Types only — no logic
│   ├── serv/      # RxJS services (Observable<T>)
│   ├── state/     # Rune state classes (.svelte.ts)
│   ├── ui/        # Components (shared/, form/, layout/, weather/)
│   └── utils/     # Pure functions (url.ts, format.ts, …)
├── routes/        # SvelteKit routes
├── scss/          # Sass modules — tokens, mixins
├── _mock/         # Test fixtures
└── params/        # Route param matchers
```

See [`AGENTS.md`](AGENTS.md) for the full architecture and convention guide.

## Getting started

### Prerequisites

- Node.js ≥ 20 and npm
- A free [WeatherAPI](https://www.weatherapi.com/) account and API key
  ([signup](https://www.weatherapi.com/signup.aspx), [docs](https://www.weatherapi.com/docs/))

### Setup

```sh
cd weather-app
npm install
cp .env.example .env   # then fill in your WeatherAPI key
npm run dev
```

Environment variables (see `.env.example`):

- `WEATHER_API_KEY` — your private WeatherAPI key (server-only)
- `PUBLIC_WEATHER_API_BASE` — `https://api.weatherapi.com/v1`

Run `npm run prepare` after adding or changing env vars.

## Commands

Run from `weather-app/`:

```sh
npm run dev          # start the dev server
npm run build        # production build
npm run start         # run the production build (adapter-node)
npm run check         # svelte-check + TypeScript
npm run lint           # ESLint
npm run lint:css       # stylelint (SCSS + Svelte <style>)
npm run lint:all       # both linters
npm run format          # auto-fix lint + stylelint issues
npm run test            # Vitest + Playwright
```

Before committing, `npm run lint`, `npm run lint:css`, and `npm run check` should all pass.
Husky + lint-staged run ESLint/stylelint `--fix` on staged files automatically.

## Docs

- [`docs/diagrams/url-state-flow.svg`](docs/diagrams/url-state-flow.svg) —
  Explains how the RxJS and Runes state boundaries work
- [`AGENTS.md`](AGENTS.md) — architecture and coding conventions
