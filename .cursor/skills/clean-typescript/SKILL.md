---
name: clean-typescript
description: >-
  TypeScript style and type discipline for this app — strict mode, no `any`, type
  organisation, file naming, and ESLint conventions. Apply when writing or reviewing
  TypeScript, hitting type errors, or naming new files.
---
## Strict mode
- `tsconfig.json` enforces strict mode — `noImplicitAny`, `strictNullChecks`, etc. are on.
- Never use `any`; use `unknown` and narrow, or define a proper type in `src/lib/def/`.
- Prefer `type` over `interface` for object shapes; use `interface` only for extension.

## Type organisation
- `src/lib/def/` — TypeScript types and interfaces only, no logic.
- Use `import type { Weather } from '$lib/def/weather'` for type-only imports — always `import type`.

## File naming
| Suffix | Rule |
|--------|------|
| `.server.ts` | Server-only — never imported on the client |
| `.svelte.ts` | Contains Svelte 5 runes — must use `.svelte.ts` for the compiler to process |
| `.test.ts` | Colocated Vitest test — not in a separate `__tests__/` folder |

## ESLint & stylelint
- All output must pass `npm run lint` — run before declaring a change done.
- `npm run lint:css` for SCSS and Svelte `<style>` blocks (stylelint; this app does not use Prettier).
- Do not disable lint rules inline (`// eslint-disable`) without a comment explaining why.

## Patterns to avoid
- No `as unknown as T` double-cast to escape type checking — fix the type instead.
- No non-null assertions (`!`) when the value could genuinely be null — handle it.
- No implicit `any` in function parameters — always annotate.
