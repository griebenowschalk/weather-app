import { fromFetch } from "rxjs/fetch";
import {
  BehaviorSubject,
  catchError,
  finalize,
  switchMap,
  throwError,
  type Observable,
} from "rxjs";

export type ApiError = {
  status: number;
  message: string;
};

/** Count of in-flight requests */
export const fetchCount$ = new BehaviorSubject(0);

/**
 * Turn a fetch into a typed Observable. Parses JSON on 2xx, throws ApiError otherwise.
 * get$/handleFetch: fromFetch -> switchMap on res.ok -> json | throw.
 */
function handleFetch<T>(
  req$: Observable<Response>,
  name: string,
): Observable<T> {
  fetchCount$.next(fetchCount$.value + 1);
  return req$.pipe(
    switchMap((res) => {
      if (res.ok) {
        return res.json() as Promise<T>;
      }
      return throwError(
        () =>
          ({
            status: res.status,
            message: `${name} failed (${res.status})`,
          }) satisfies ApiError,
      );
    }),
    catchError((err) =>
      throwError(() =>
        "status" in (err ?? {})
          ? (err as ApiError)
          : ({
              status: 0,
              message: `${name}: network error`,
            } satisfies ApiError),
      ),
    ),
    finalize(() => fetchCount$.next(fetchCount$.value - 1)),
  );
}

/** GET returning an Observable<T> */
export function get$<T>(url: string): Observable<T> {
  return handleFetch<T>(fromFetch(url), `GET ${url}`);
}

/** Alias kept to mirror work's anonymous variant naming. */
export const getAnon$ = get$;
