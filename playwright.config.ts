import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
});
