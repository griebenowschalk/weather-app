---
name: rxjs-patterns
description: >-
  RxJS Observable patterns used in this app's service layer — subscription management,
  BehaviorSubject, shareReplay, take(1), and the Runes/RxJS boundary. Apply when writing
  or debugging service files in src/lib/serv/, creating Observables, subscribing to streams,
  or wiring a Rune state class to a service.
---
## Core rule
All HTTP calls go through the RxJS wrapper in `$lib/serv/core/http` (`get$` / `getAnon$`) — never
raw `fetch` in a service file. Service files return `Observable<T>`, not `Promise<T>`.

## Subscription patterns
| Pattern | When |
|---------|------|
| `.pipe(take(1)).subscribe(...)` | One-shot request (load data once) |
| `shareReplay(1)` | Shared stream multiple components listen to |
| `BehaviorSubject<T>` | Imperative state with a current value (e.g. selected city, theme) |
| `switchMap` | Cancel previous request when a new one comes in (search, city change) |

- Always `.pipe(take(1))` for one-shot calls — omitting it keeps the subscription open.
- Subscriptions in Svelte components: unsubscribe in `onDestroy`, subscribe inside `$effect` and
  return `() => sub.unsubscribe()`, or use the Rune state class pattern.

## Rune state class ↔ RxJS
```typescript
// .svelte.ts — correct pattern
export class WeatherDetailState {
  data = $state<Weather | null>(null);
  status = $state<'initial' | 'loading' | 'success' | 'error'>('initial');
  error = $state<unknown>(null);

  load(city: string) {
    this.status = 'loading';
    fetchWeather$(city).pipe(take(1)).subscribe({
      next: (item) => { this.data = item; this.status = 'success'; },
      error: (err) => { this.error = err; this.status = 'error'; },
    });
  }
}
```
- Never subscribe inside a Svelte component directly if a state class exists for that domain.
- Status enum (`initial | loading | success | error`) is the standard shape; pair it with `error`.

## Error handling
- Always provide an `error` callback in `.subscribe({ next, error })` — unhandled errors silently
  kill streams.
- Use `catchError` in the pipeline when you want to recover and return a fallback value.

## Library versions
RxJS API varies by version. Use context7 for operator signatures and version-specific patterns
rather than guessing from training data.
