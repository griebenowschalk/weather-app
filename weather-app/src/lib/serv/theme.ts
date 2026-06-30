import { browser } from "$app/environment";
import { combineLatest, map, Observable, of, shareReplay } from "rxjs";
import { observe, setItem } from "./core/local-store";

export type Theme = "light" | "dark";
const KEY = "theme";

// OS preference as a stream.
function prefersDark$(): Observable<boolean> {
  if (!browser) return of(false);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  return new Observable<boolean>((sub) => {
    sub.next(mq.matches);
    const handler = (e: MediaQueryListEvent) => sub.next(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });
}

// Resolved theme = stored choice if set, else OS preference. Mirrors work's theme.ts.
export const theme$: Observable<Theme> = combineLatest([
  prefersDark$(),
  observe(KEY),
]).pipe(
  map(([systemDark, stored]) =>
    stored ? (stored as Theme) : systemDark ? "dark" : "light",
  ),
  shareReplay(1),
);

export function setTheme(theme: Theme): void {
  setItem(KEY, theme);
}
