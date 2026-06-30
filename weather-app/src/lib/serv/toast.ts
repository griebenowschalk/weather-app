import { Subject, scan, type Observable } from "rxjs";

export type ToastType = "success" | "error" | "info";
export type Toast = { id: number; message: string; type: ToastType };

type ToastEvent = { add?: Toast; removeId?: number };

const events$ = new Subject<ToastEvent>();
let nextId = 0;

/** A running list of active toasts, accumulated over time with scan. */
export const toasts$: Observable<Toast[]> = events$.pipe(
  scan((list, e) => {
    if (e.add) return [...list, e.add];
    if (e.removeId !== undefined) {
      return list.filter((t) => t.id !== e.removeId);
    }
    return list;
  }, [] as Toast[]),
);

/** Fire a toast from anywhere — no UI import needed. */
export function toast(message: string, type: ToastType = "success"): void {
  const id = nextId++;
  events$.next({ add: { id, message, type } });
  setTimeout(() => events$.next({ removeId: id }), 4000);
}
