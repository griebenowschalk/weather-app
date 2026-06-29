# Weather App — Agent Guide

SvelteKit 2 + Svelte 5 + RxJS weather dashboard. Mirrors the `food-web-order` work codebase patterns.

**App root:** `weather-app/` — run all npm commands from there.

**Course docs:** `docs/WEEKEND_PROJECT_COURSE.md` (build guide), `docs/PATTERN_IMPROVEMENTS.md` (where to go beyond work patterns).

## Architecture

```
weather-app/src/
├── lib/
│   ├── def/       # Types only — no logic
│   ├── serv/      # RxJS services (Observable<T>, get$/getAnon$)
│   ├── state/     # Rune state classes (.svelte.ts) — no Svelte stores
│   ├── ui/        # Components (shared/, form/, layout/, weather/)
│   └── util/      # Pure functions
├── routes/        # SvelteKit routes (+page.svelte, +page.server.ts, +server.ts)
├── scss/          # Sass modules (@use/@forward) — tokens, mixins, component SCSS
├── _mock/         # Test fixtures + StateTestWrapper.svelte
└── params/        # Route param matchers
```

| Concern | Location | Pattern |
|---------|----------|---------|
| Types | `src/lib/def/` | `type` over `interface`, `import type` |
| Shared/async state | `src/lib/serv/` | RxJS Observables, `shareReplay`, `switchMap` |
| Feature/UI state | `src/lib/state/*.svelte.ts` | Svelte 5 Runes (`$state`, `$derived`, `$effect`) |
| HTTP | `src/lib/serv/core/http.ts` | `get$` / `getAnon$` — never raw `fetch` in services |
| URL state | `?city=` query param | URL is source of truth, bridged into RxJS via `$effect` |

## SSR vs client rendering

This project uses **SSR (Server-Side Rendering)** by default — SvelteKit's normal mode with `adapter-node`.

**What happens on a request:**
1. Node server (`node build`) receives the HTTP request.
2. Server runs `+page.server.ts` load functions, `+server.ts` handlers, `hooks.server.ts`.
3. Server renders Svelte components to HTML (with data already resolved).
4. Browser receives full HTML (fast first paint, SEO-friendly).
5. Client JS **hydrates** — attaches event listeners and takes over interactivity.
6. Subsequent navigations can use client-side routing (no full page reload).

**What makes code "server-only":**
- Files with `.server.ts` suffix (`+page.server.ts`, `env.server.ts`, `hooks.server.ts`)
- `$env/static/private` imports
- Code in `+server.ts` route handlers

**Never use in server code:** `window`, `document`, `localStorage`, `matchMedia` — guard with `import { browser } from '$app/environment'` when shared code needs them.

**Pure CSR (client-side rendering)** would mean the server sends a blank shell and the browser renders everything from JS. That's SPA mode (`export const ssr = false`) or plain Svelte without SvelteKit. This project does **not** do that — it SSRs every page unless explicitly opted out.

**Why `adapter-node`:** `npm run build` → `build/` folder; `npm run start` → `node build` runs a persistent Node HTTP server that SSRs on each request. Matches work deployment (Docker/Railway/VPS).

## SCSS mixins

Sass mixins live in `src/scss/var/_mixins.scss`. They are reusable CSS pattern blocks — not TypeScript mixins.

```scss
@use '$scss/var/mixins' as *;

.card {
  @include flex-center;
  @include focus-visible;

  @include respond-to('md') {
    padding: $space-lg;
  }
}
```

Planned mixins (from course):
- `respond-to($bp)` — media-query breakpoint wrapper
- `flex-center` — flexbox centering
- `focus-visible` — accessible focus ring
- `sr-only` — screen-reader-only text

Pull tokens via `@use '$scss/var/tokens' as *`. Never use deprecated `@import` — always `@use` / `@forward`.

## Commands

Run from `weather-app/`:

```bash
npm run dev          # dev server with SSR
npm run build        # production build (adapter-node)
npm run start        # node build
npm run check        # svelte-check + TypeScript
npm run lint         # ESLint
npm run lint:css     # stylelint (SCSS + Svelte <style>)
npm run test         # Vitest + Playwright
```

All changes must pass `npm run lint` and `npm run lint:css`. No Prettier — stylelint handles CSS/SCSS.

## Agent skills & rules

Detailed conventions live in `.cursor/skills/` (mirrors `.claude/skills/`):

| Skill | Use when |
|-------|----------|
| `sveltekit-best-practices` | Routes, load functions, SSR, Runes vs RxJS |
| `rxjs-patterns` | Service files in `src/lib/serv/` |
| `clean-typescript` | TypeScript style, file naming, lint |
| `testing-conventions` | Vitest and Playwright tests |
| `web-security` | Route handlers, env, user input |

Cursor rules in `.cursor/rules/` apply automatically by file pattern.

## Hard rules

- No `any` — use `unknown` and narrow, or types in `src/lib/def/`
- No Svelte stores (`writable`/`readable`) in new code
- No raw `fetch` in service files — use `get$`/`getAnon$`
- No `{@html}` with unsanitised user content
- Subscriptions in `$effect` must return `() => sub.unsubscribe()`
- Status shape: `'initial' | 'loading' | 'success' | 'error'` + `error: unknown`
