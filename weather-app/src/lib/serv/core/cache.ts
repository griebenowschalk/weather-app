/** Unified loading/error/payload shape for data-driven components. */
export type Cache<T> = {
  loading?: boolean;
  error?: unknown;
  payload?: T;
};
