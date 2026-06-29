import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $scss: "src/scss",
      "mock/*": "src/_mock/*", // fixtures alias, matches work
    },
  },
};
