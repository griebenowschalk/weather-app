import { browser } from "$app/environment";
import { BehaviorSubject, type Observable } from "rxjs";

const subjects = new Map<string, BehaviorSubject<string | null>>();

function subjectFor(key: string): BehaviorSubject<string | null> {
  let s = subjects.get(key);
  if (!s) {
    const initial = browser ? localStorage.getItem(key) : null;
    s = new BehaviorSubject<string | null>(initial);
    subjects.set(key, s);
  }
  return s;
}

/** Emits the current value immediately, then on every setItem. */
export function observe(key: string): Observable<string | null> {
  return subjectFor(key).asObservable();
}

export function setItem(key: string, value: string): void {
  if (browser) localStorage.setItem(key, value);
  subjectFor(key).next(value);
}
