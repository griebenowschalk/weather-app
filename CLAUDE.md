# Weather App — Claude Code Guide

SvelteKit 2 + Svelte 5 + RxJS weather dashboard. Mirrors the `food-web-order` work codebase patterns.

**App root:** `weather-app/` — run all npm commands from there.

**Docs:** `docs/WEEKEND_PROJECT_COURSE.md` (build guide), `docs/PATTERN_IMPROVEMENTS.md` (improvements beyond work patterns).

**Cursor parity:** `AGENTS.md` covers the same conventions for Cursor (`.cursor/skills/` mirrors `.claude/skills/`).

## Architecture

```
weather-app/src/
├── lib/
│   ├── def/       # Types only — no logic
│   ├── serv/      # RxJS services (Observable<T>, get$/getAnon$)
│   ├── state/     # Rune state classes (.svelte.ts) — no Svelte stores
│   ├── ui/        # Components (shared/, form/, layout/, weather/)
│   └── utils/     # Pure functions (url.ts, format.ts, …)
├── routes/        # SvelteKit routes (+page.svelte, +page.server.ts, +server.ts)
├── scss/          # Sass modules (@use/@forward) — tokens, mixins
├── _mock/         # Test fixtures + StateTestWrapper.svelte
└── params/        # Route param matchers
```

| Concern | Location | Pattern |
|---------|----------|---------|
| Types | `src/lib/def/` | `type` over `interface`, `import type` |
| Shared/async state | `src/lib/serv/` | RxJS Observables, `shareReplay`, `switchMap` |
| Feature/UI state | `src/lib/state/*.svelte.ts` | Svelte 5 Runes (`$state`, `$derived`, `$effect`) |
| HTTP (client) | `src/lib/serv/core/http.ts` | `get$` / `getAnon$` — never raw `fetch` in services |
| HTTP (server proxy) | `src/routes/api/**/+server.ts` | Plain `fetch` with secrets from `env.server.ts` |
| URL state | `?city=` query param | URL is source of truth, bridged into RxJS via `$effect` |

## Config

- **SvelteKit:** `weather-app/svelte.config.ts` is the single source of truth (`adapter-node`, `$scss` / `mock/*` aliases, preprocess).
- **Vite:** `weather-app/vite.config.ts` — Vitest only; `sveltekit()` with no duplicate kit options.
- **Env:** `.env` (gitignored), `.env.example` (committed). Run `npm run prepare` after adding env vars.

## SSR

Default SSR via `adapter-node`. Server-only: `*.server.ts`, `$env/static/private`, `+server.ts` handlers. Guard browser APIs with `import { browser } from '$app/environment'`.

## Commands

Run from `weather-app/`:

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # node build
npm run check        # svelte-check + TypeScript
npm run lint         # ESLint
npm run lint:css     # stylelint (SCSS + Svelte <style>)
npm run lint:all     # both linters
npm run format       # eslint + stylelint --fix (whole project)
npm run test         # Vitest + Playwright
```

Before declaring work done: `npm run lint`, `npm run lint:css`, and `npm run check` must pass.

Pre-commit (Husky): ESLint + Stylelint `--fix` on staged files via `lint-staged`.

No Prettier — ESLint + stylelint handle formatting.

## Skills

Read the relevant skill from `.claude/skills/` before writing code in that area:

| Skill | Use when |
|-------|----------|
| `sveltekit-best-practices` | Routes, load functions, SSR, Runes vs RxJS |
| `rxjs-patterns` | Service files in `src/lib/serv/` |
| `clean-typescript` | TypeScript style, file naming, lint |
| `testing-conventions` | Vitest and Playwright tests |
| `web-security` | Route handlers, env, user input |

## Hard rules

- No `any` — use `unknown` and narrow, or types in `src/lib/def/`
- No Svelte stores (`writable`/`readable`) in new code
- No raw `fetch` in `src/lib/serv/` — use `get$`/`getAnon$`
- Internal links: `resolve()` from `$app/paths`; programmatic nav via `$lib/utils/url`
- No `{@html}` with unsanitised user content
- RxJS subscriptions in `$effect` must return `() => sub.unsubscribe()`
- Status shape: `'initial' | 'loading' | 'success' | 'error'` + `error: unknown`
- SCSS: `@use` / `@forward` only — never `@import`
- Route groups like `(app)` do not appear in the URL

## RxJS ↔ Runes boundary

```
URL (?city=) ─$effect─> setCity() ─> currentWeather$ ─$effect─> WeatherDashboardState.$state ─> UI
```

Services expose `xxx$` streams. State classes subscribe inside `$effect` and copy into `$state`. Components read state classes — never subscribe to Observables directly.
