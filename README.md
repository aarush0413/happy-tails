# Happy Tails — Pune Metro Pet Services Directory

A curated directory of verified pet service providers across 7 categories in **Pune metro** (PMC, PCMC, and major corridors). Area clusters include East Pune, West, North–West, South, Central, and fringe pockets — see `src/data/areas.json`.

## Features

- **94 Provider Listings** across Vets, Grooming, Pet Stores, Boarding, Training, Walking & Transport
- **Emergency 24/7 Finder** — instant access to round-the-clock veterinary clinics
- **Review Audit System** — providers are verified, cautioned, or blacklisted based on independent review audits
- **Transparent Pricing Guide** — Budget, Mid & Premium pricing for every service type
- **Area Explorer** — dashboard view per area with coverage statistics
- **Smart Filters** — filter by area, category, rating, 24/7 availability, home visits
- **SEO Optimized** — structured data, sitemap, meta tags for all 115 pages
- **AdSense Ready** — Google AdSense integration for monetization

## Tech Stack

- **Next.js 16** (App Router, TypeScript, SSG)
- **Tailwind CSS v4** with custom Bluey-inspired color palette
- **Framer Motion** for animations
- **Lucide React** for icons
- **TheDogAPI / TheCatAPI** for pet facts and images

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

This repo is linked to the Vercel project **`happytails`** (team: `aarushsaxena1304-7825s-projects`). Production alias: **`https://happy-tails-coral.vercel.app`**.

Deploy the current folder to production:

```bash
npx vercel deploy --prod --yes
```

Git pushes only update **www.happytails.co.in** if the GitHub integration is attached to this same Vercel project **and** the production branch matches (`main`).

### If the custom domain shows an old site

The Vercel deployment with the latest code is **`happy-tails-coral.vercel.app`**. If that URL is new but **www.happytails.co.in** is still old, the domain is pointed at a **different** Vercel project (or stale DNS).

1. Open [Vercel Dashboard](https://vercel.com) → find the project that shows deployment **`happy-tails-coral`** / **`happytails`**.
2. **Settings → Domains** → add `happytails.co.in` and `www.happytails.co.in`.
3. If Vercel says the domain is already in use, open the **other** project that owns it → **remove** the domain there → add it on **`happytails`**.
4. Apply the DNS records Vercel shows (or fix the CNAME at your registrar / Cloudflare).

## Live Domain

- Intended: `https://happytails.co.in` and `https://www.happytails.co.in` (must be attached to the **`happytails`** project above).
- Verify latest build: open **`https://happy-tails-coral.vercel.app`** — it should match production before fixing DNS.

## AdSense Setup

1. Sign up at [adsense.google.com](https://adsense.google.com)
2. Replace `ca-pub-XXXXXXXXXX` in `.env.local` and `public/ads.txt` with your publisher ID
3. Ad slots are already placed throughout the app (between sections, on detail pages)

## Project Structure

```
src/
  app/            — Next.js pages (home, category, provider, area, emergency, pricing, about)
  components/     — Reusable UI components (Header, Footer, ProviderCard, FilterBar, Badge, Button)
  lib/            — Utilities, types, constants, API helpers
  data/           — JSON data files (providers, pricing, audits)
```
