/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/setupTests.ts"],
    coverage: {
      include: ["app/components/**", "app/hooks/**", "app/routes/**"],
    },
  },
});
