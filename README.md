# Happy Tails - East Pune's Premium Pet Services Directory

A curated directory of 101 verified pet service providers across 7 categories in East Pune — Kalyani Nagar, Viman Nagar, Kharadi & Hadapsar.

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

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## Live Domain

- Primary URL: `https://happytails.co.in`
- Secondary URL: `https://www.happytails.co.in`

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
