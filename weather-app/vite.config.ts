import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { sveltekit } from "@sveltejs/kit/vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

const targets = browserslistToTargets(
  browserslist(
    "defaults, fully supports es6-module, maintained node versions, last 2 versions, not dead",
  ),
);

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    transformer: "lightningcss", // ← the line that turns it on
    lightningcss: { targets },
  },
  build: { cssMinify: "lightningcss" },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "client",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium", headless: true }],
          },
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
        },
      },

      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
