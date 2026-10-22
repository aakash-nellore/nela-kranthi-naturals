import fs from "fs";
import path from "path";
import { defineConfig, devices } from "@playwright/test";

// Load local environment variables for tests if .env.local exists on disk
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

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
        command: process.env.CI
          ? "npx next start -H 127.0.0.1 -p 3000"
          : "npx next dev -H 127.0.0.1 -p 3000",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        env: {
          ALLOW_TEST_ADMIN_SESSION: "true",
        },
      },
});
