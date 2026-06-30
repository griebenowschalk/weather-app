import { browser } from "$app/environment";
import { setTheme, theme$, type Theme } from "$lib/serv/theme";

export class ThemeState {
  theme = $state<Theme>("light");
  isDark = $derived(this.theme === "dark");

  constructor() {
    // Subscribe to the RxJS service inside $effect; clean up on teardown.
    $effect(() => {
      const sub = theme$.subscribe((t) => {
        this.theme = t;
        if (browser) document.documentElement.dataset.theme = t; // drives SCSS [data-theme]
      });
      return () => sub.unsubscribe();
    });
  }

  toggle(): void {
    setTheme(this.isDark ? "light" : "dark");
  }
}
