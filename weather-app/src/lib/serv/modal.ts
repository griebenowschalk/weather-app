const closers = new Set<() => void>();

export function registerModal(close: () => void) {
  closers.add(close);
}
export function deregisterModal(close: () => void) {
  closers.delete(close);
}
export function closeAllModals() {
  for (const close of closers) close();
}
