# Nela Kranthi Naturals

A modern, responsive web application and administrative management portal for **Nela Kranthi Naturals**, a natural foods and solar-dehydration business based in Sydapuram, Nellore District, Andhra Pradesh, India.

---

## Overview

The platform consists of two primary portals:
1. **Public Website**: Showcases the brand's solar-dehydrated fruits, vegetables, leafy greens, and food powders. Features product catalog browsing, detailed nutritional profiles, solar dehydration process explanations, bulk inquiry workflows, and direct contact options (WhatsApp, telephone, email, and inquiry form).
2. **Admin Portal**: An authenticated administrative dashboard (`/admin`) allowing business managers to view KPIs, manage product listings and categories, review content assets, and verify storage and contact configurations.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [React](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth, Supabase Storage)
- **Testing & Quality**: [Playwright](https://playwright.dev/) (End-to-End & Cross-Viewport Testing), ESLint

---

## Project Structure

```text
nela-kranthi-naturals/
├── app/
│   ├── (public)/                 # Public-facing routes (Home, Products, About, Solar Dehydration, Bulk, Contact)
│   ├── admin/                    # Authenticated administrative portal and login
│   ├── layout.tsx                # Root layout with brand metadata and fonts
│   ├── robots.ts                 # Search engine crawler policies
│   └── sitemap.ts                # Dynamic XML sitemap generator
├── components/
│   ├── admin/                    # Admin portal tables, forms, and KPI cards
│   ├── contact/                  # Contact and inquiry forms
│   ├── home/                     # Homepage feature sections (Hero, Solar, Products, Why Us, Bulk, Contact)
│   ├── layout/                   # Public Navbar, Footer, and Navigation drawers
│   └── products/                 # Product cards, detail views, and category filters
├── data/                         # Static fallback product catalog
├── lib/                          # Supabase client helpers, image URL resolvers, constants
├── tests/                        # Playwright test suites (responsive, smoke, navigation, products, admin, contact, seo)
└── types/                        # TypeScript definitions
```

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm, pnpm, or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Configure the required Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public application.

---

## Quality Assurance & Testing

Run automated checks before creating production builds:

```bash
# Type check TypeScript without emit
npm run typecheck

# Static analysis and linting
npm run lint

# Run Playwright end-to-end and responsive tests
npm run test

# Run smoke tests only
npm run test:smoke

# Compile optimized production bundle
npm run build
```

---

## License

Private and proprietary. Copyright © Nela Kranthi Naturals. All rights reserved.
