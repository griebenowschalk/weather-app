---
name: testing-conventions
description: >-
  Vitest unit/component and Playwright E2E conventions for this app — test structure,
  API mocking, fixture data, Page Object Model, and what not to do. Apply when writing
  or modifying tests.
when_to_use: >-
  Writing unit tests, component tests, or Playwright E2E tests; mocking API calls;
  adding fixture data; debugging test failures.
allowed-tools: Read, Grep
---
## Unit & component tests (Vitest)
- Colocate `.test.ts` files next to their source in `src/lib/` — never in a separate `__tests__/`.
- Import `vi`, `describe`, `it`, `expect` from `vitest` — not from `@testing-library/jest-dom`.
- Use `vi.mock('$lib/serv/...')` for module mocking.
- Fixture data lives in `src/_mock/` — add fixtures there, not inline in test files.
- Test Rune state classes with `StateTestWrapper.svelte` from `src/_mock/`.
- Test service Observables with a subscribe-and-collect pattern (push emissions into an array, then
  assert on the array).
- Do not use `.only` in committed test files — CI enforces this.

## Running tests
```bash
npm run test                        # all unit/component tests (CI mode)
npm run test:lib                    # watch mode
npx vitest run src/lib/foo.test.ts  # single file
npx vitest run -t "pattern"         # by name
```

## E2E tests (Playwright)
- All E2E tests in `e2e/`.
- Use Page Object Model — POM classes in `e2e/_pom/`; no selectors inline in test bodies.
- Global setup/teardown: `e2e/global.setup.ts` / `e2e/global.teardown.ts`.

```bash
npm run test:e2e                            # all E2E tests
npx playwright test e2e/home/weather.test.ts # single file
npx playwright test --grep "pattern"        # by name
```

## What to test
- Unit: pure functions in `src/lib/util/` and `src/lib/serv/` service logic.
- Component: Rune state classes via `StateTestWrapper`; UI components with `@testing-library/svelte`.
- E2E: golden paths and critical user journeys; not every edge case.
