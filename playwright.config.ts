import { defineConfig } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:1313";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"], ["html"]],
  use: {
    baseURL,
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx serve docs/public -l tcp://localhost:1313 --no-clipboard",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
});
