import { defineConfig, devices } from "@playwright/test";

/**
 * Resolves the target base URL for tests.
 * Supports:
 * - WEBSITE_URL: Preferred variable for deployed Vercel live tests and CI
 * - BASE_URL: Standard secondary alias
 * - Default: http://localhost:3000 for local Next.js runs
 */
const resolvedBaseUrl = (
  process.env.WEBSITE_URL ||
  process.env.BASE_URL ||
  "http://localhost:3000"
)
  .trim()
  .replace(/\/+$/, "");

const isRemoteTarget = Boolean(process.env.WEBSITE_URL || process.env.BASE_URL);

export default defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for */
  timeout: 45 * 1000,
  expect: {
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,
  /* Worker count: balanced for CI and local machines */
  workers: 2,
  /* Test result reporters */
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  /* Shared settings for all test projects */
  use: {
    baseURL: resolvedBaseUrl,
    navigationTimeout: 30 * 1000,
    actionTimeout: 15 * 1000,
    /* Trace recorded on retry for readable debugging */
    trace: "on-first-retry",
    /* Capture screenshots on test failure */
    screenshot: "only-on-failure",
    /* Retain video on test failure */
    video: "retain-on-failure",
  },

  /* Primary browser project */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run local Next.js server when testing locally (skipped when testing remote Vercel URL) */
  webServer: isRemoteTarget
    ? undefined
    : {
        command: process.env.CI ? "npm run start" : "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
      },
});
