---
name: web-security
description: >-
  Web security rules for this SvelteKit app — XSS prevention, server/client boundary,
  secrets handling, and input validation. Apply when writing route handlers, working
  with user input, or touching env/config code.
when_to_use: >-
  Writing +server.ts endpoints, handling form data or URL params, working near .env,
  rendering user-supplied content, or reviewing code for security issues.
allowed-tools: Read, Grep
---
## Output encoding
- Never use `{@html ...}` with unsanitised user content — Svelte escapes text by default.
- If `{@html}` is unavoidable, sanitise with a trusted library (e.g. DOMPurify) first.

## Server / client boundary
- `.server.ts` files are never bundled for the client — keep secrets and API keys there.
- Do not import `.server.ts` modules from `+page.svelte`, `+layout.svelte`, or any client path.
- `$env/static/private` is server-only; `$env/static/public` (`PUBLIC_` prefix) is safe for client.

## Input validation
- Validate and sanitise all external input (request bodies, URL params, form data) at server
  boundaries before use — e.g. the `city` query param on the weather endpoint.
- Never trust client-supplied data without re-checking it server-side.

## Secrets
- Never hardcode API keys or tokens — use `$env/static/private` or shell env vars.
- Never log secret headers, tokens, or PII — check log statements near request code.
- `.env` is gitignored; add required var names (not values) to `.env.example`.
