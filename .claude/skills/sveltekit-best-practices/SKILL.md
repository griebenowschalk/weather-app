---
name: sveltekit-best-practices
description: >-
  SvelteKit 2 + Svelte 5 patterns for this app — routing, load functions, SSR, Runes,
  and the RxJS/Runes state split. Use when adding routes, writing load functions, or
  deciding where state should live.
when_to_use: >-
  Adding or modifying routes, +page.svelte, +layout.svelte, load functions,
  server vs client rendering, or choosing between RxJS and Svelte 5 Runes.
allowed-tools: Read, Grep
---
## Routing
- Route groups: `(app)` for customer-facing pages, `api/` for endpoints. Add more groups only when
  a distinct layout/concern justifies it.
- Route matchers live in `src/params/` — reuse an existing matcher before adding a new one.
- SvelteKit file conventions: `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+server.ts`.

## Load functions
- `load()` in `+page.server.ts` for server-only data (secrets, API keys); `+page.ts` for shared.
- Return typed objects — define the type in `src/lib/def/`, not inline.
- Throw `error()` or `redirect()` from `@sveltejs/kit`, not plain exceptions.

## State: Runes vs RxJS
| Use | When |
|-----|------|
| Svelte 5 Runes (`.svelte.ts` in `src/lib/state/`) | Feature/component-bound state |
| RxJS Observables (`src/lib/serv/`) | Long-lived shared/async state (weather streams, theme, config) |
- Never mix patterns: Rune classes call RxJS services and assign to `$state` in `.subscribe()`.
- No Svelte stores (`writable`, `readable`) in new code.

## SSR
- `adapter-node` — app runs as a Node server; avoid browser-only APIs in `+page.server.ts`.
- `$env/static/private` for server-only env vars; `$env/static/public` (prefix `PUBLIC_`) for client.
- `.server.ts` suffix marks server-only files — never import them from client-side paths.

## Library versions
SvelteKit 2 and Svelte 5 change frequently. Use context7 for API details before writing
load-function signatures, rune APIs, or adapter config.
