# Automated Testing Framework — Nela Kranthi Naturals

This directory contains the automated end-to-end (E2E) testing suite for the **Nela Kranthi Naturals** website, built using [Playwright](https://playwright.dev/) and TypeScript.

---

## 📋 What the Tests Check

| Test Suite | File | What It Validates |
| :--- | :--- | :--- |
| **Smoke & Browser Health** | `tests/smoke.spec.ts` | Verifies homepage responds with HTTP 200, checks brand logo and visible typography render, captures unhandled JavaScript exceptions, and detects failed critical network requests. |
| **Site Navigation** | `tests/navigation.spec.ts` | Navigates through all core routes (`/`, `/products`, `/about`, `/solar-dehydration`, `/bulk-orders`, `/contact`), tests header and footer navigation links, and verifies that nonexistent URLs return a proper 404 response. |
| **Products Catalogue** | `tests/products.spec.ts` | Verifies the catalogue displays products, tests category filters (e.g. *Fruit Powders*), dynamically discovers all product detail links from `/products`, and verifies each product detail page renders headings, descriptions, and loaded images without broken image errors. |
| **Contact Channels** | `tests/contact.spec.ts` | Verifies telephone links (`tel:+917207717966`), WhatsApp links (`wa.me/917207717966`), and official business email links (`mailto:nelakranthinaturals@gmail.com`) across header, footer, contact page, and bulk orders page. Checks form fields without submitting network data. |
| **Responsive Layout** | `tests/responsive.spec.ts` | Tests standard mobile screen widths (**360px**, **390px**, **412px**), tablet (**768px**), and desktop (**1280px**). Verifies no horizontal page overflow occurs and tests mobile navigation hamburger opening/closing. |
| **SEO & Metadata** | `tests/seo.spec.ts` | Validates document `<title>` tags contain brand keywords, checks `<meta name="description">` tags on key pages, and verifies technical accessibility of `/robots.txt` and `/sitemap.xml`. |

---

## 🛠️ Prerequisites & Installation

Playwright and its browsers are installed as development dependencies.

1. **Install Node.js dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Install Playwright Chromium browser**:
   ```bash
   npx playwright install chromium
   ```

---

## 🚀 Running Tests Locally

### Option 1: Run All Tests (Headless)
Runs all test suites using the local development server:
```bash
npm test
```

### Option 2: Run a Specific Test Suite
You can run any individual test file:
```bash
# Smoke test only
npm run test:smoke

# Navigation tests only
npx playwright test tests/navigation.spec.ts

# Products tests only
npx playwright test tests/products.spec.ts

# Responsive layout tests only
npx playwright test tests/responsive.spec.ts

# SEO tests only
npx playwright test tests/seo.spec.ts
```

### Option 3: Interactive UI Mode (Recommended for visual debugging)
Opens Playwright's visual dashboard with time-travel debugging:
```bash
npm run test:ui
```

---

## 🌐 Running Tests Against the Deployed Vercel Website

You can run the exact same test suite directly against your live deployed Vercel URL without modifying any test code.

Supply the `WEBSITE_URL` environment variable:

### On Windows PowerShell:
```powershell
$env:WEBSITE_URL="https://your-deployment-url.vercel.app"
npm test
$env:WEBSITE_URL=""
```

### On Windows CMD:
```cmd
set WEBSITE_URL=https://your-deployment-url.vercel.app
npm test
set WEBSITE_URL=
```

### On macOS / Linux:
```bash
WEBSITE_URL="https://your-deployment-url.vercel.app" npm test
```

> **Note:** When `WEBSITE_URL` is set, Playwright skips starting a local server and directs all requests to the live deployment URL.

---

## 📊 Viewing HTML Test Reports

After a test run, Playwright generates a detailed HTML report including step-by-step logs, screenshots of any failures, and traces.

To open the report in your browser:
```bash
npm run test:report
```

---

## ⚙️ Configuring `WEBSITE_URL` in GitHub Actions

The repository includes a GitHub Actions workflow at [`.github/workflows/website-tests.yml`](../.github/workflows/website-tests.yml).

### 1. Automatic CI (Every Push & Pull Request to `master`)
Every push to `master` automatically:
1. Runs TypeScript checks (`npm run typecheck`).
2. Runs ESLint (`npm run lint`).
3. Builds the Next.js production bundle (`npm run build`).
4. Runs the automated test suite against the local build.
5. Uploads the HTML test report as an artifact if any test fails.

### 2. Manual Live Site Smoke Test (`workflow_dispatch`)
To trigger tests against your live Vercel URL directly from GitHub:
1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **Variables** tab.
2. Click **New repository variable**.
3. Set the name to: `WEBSITE_URL`
4. Set the value to your live Vercel production URL (e.g., `https://nela-kranthi-naturals.vercel.app` or custom domain).
5. Go to the **Actions** tab → Select **Website Quality & Automated Tests** → Click **Run workflow** → Enter an optional URL override or leave blank to use `WEBSITE_URL`.

---

## 🔍 How to Interpret Failed Tests

When a test fails, Playwright provides actionable feedback:

1. **Assertion Failure message**:
   - `Expected HTTP 200 for /products/banana-powder, got 404`: Indicates a route is missing or slug does not match.
   - `Detected horizontal page overflow on "/about" at viewport 360px`: Indicates an element has a fixed width larger than 360px causing side-scrolling.
   - `Product image on /products/... failed to load (naturalWidth = 0)`: Indicates an image asset was moved or the remote storage URL returned an error.

2. **Inspect the Artifacts**:
   - Run `npm run test:report` locally to view screenshots and failure traces.
   - On GitHub Actions, download the `playwright-report-local` or `test-results-local` artifact from the bottom of the failed workflow run.
