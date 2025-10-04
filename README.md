# Viksit Bharat RaaBITA – Civic Issue Reporting

A modern, mobile‑first civic issue reporting and transparency platform. Citizens can report issues via WhatsApp, IVR, and SMS. Municipal teams get dashboards, maps, and analytics to track resolution across wards and states.

## Features

- Citizen Reporting
  - WhatsApp flow (guided prompts, attachments)
  - IVR and SMS gateway simple flows
  - Reporting flow section explaining steps end‑to‑end
- Dashboards
  - Mobile Civic Tracker beside “Empowering citizens building better india”
  - Civic Points (Ward‑wise and State‑wise) in table and chart views
  - Improvement Charts (line/bar trends over time)
  - Filters: date range, ward, state
  - Smooth, mobile‑friendly chart expand-on-touch in the same page area
- Mapping
  - Live interactive map using Leaflet + OpenStreetMap tiles
  - India Issues Map pinned around Southern India (sample data)
- Design System
  - Next.js App Router (Next.js)
  - shadcn/ui + Tailwind CSS v4 tokens in globals.css
  - Accessible, responsive layout with semantic HTML
- Footer Credits
  - “Crafted By - Karan RJ - Ishwarya S - Jashwanth MU - Jeevith V - Akshiya C - Bhavayazhinitha SV”
  - 2025 Viksit Bharat RaaBITA – Digital India Initiative

## Tech Stack

- Next.js App Router (Next.js runtime)
- TypeScript, React Server/Client Components
- shadcn/ui + Tailwind CSS v4 (design tokens in app/globals.css)
- Recharts (charts) with shadcn wrappers
- Leaflet + OpenStreetMap tiles (interactive map)
- API Routes (app/api/*) and Server Actions

## Key Files (high-level)

- app/page.tsx – Landing, hero, mobile civic tracker section, footer
- components/mobile-civic-tracker.tsx – Ward/State civic points, trends, filters, mobile chart interactions
- components/india-map-cluster.tsx – Leaflet map with issue pins (Southern India focus by default)
- components/whatsapp-integration.tsx – WhatsApp entry and flow description
- components/municipal-dashboard.tsx – Admin/municipal dashboard area
- app/api/* – Example API endpoints (upload, status, scoreboard, whatsapp, feedback, history)
- app/globals.css – Tailwind v4 + design tokens (colors, fonts, radius)
- app/layout.tsx – Fonts setup, HTML shell

## Configuration

- Mapping
  - Default: Leaflet + OpenStreetMap (no API key required)
  - Optional Mapbox: set NEXT_PUBLIC_MAPBOX_TOKEN and switch the tile layer in components/india-map-cluster.tsx.
- Environment variables
  - None strictly required for the default demo flow.
  - If you integrate providers (WhatsApp APIs, SMS gateways, IVR providers, etc.), add their keys as env vars. In Next.js, server-side code can read env vars; client vars must be prefixed with NEXT_PUBLIC_.

## Running in v0 (no local terminal required)

1. Open the Preview to run the app instantly.
2. Click Publish (top right) to deploy to Vercel from v0.
3. Use the Version panel to view changes and iterate.  
Tip: To install the code elsewhere, click the three dots in the Block view and Download ZIP, or push to GitHub via the top-right GitHub button.

## Running Locally

Prereqs:
- Node.js 18+ and pnpm or npm

Steps:
1. Clone or Download ZIP of this project.
2. Install dependencies:
   - pnpm install
   - or npm install
3. Start dev server:
   - pnpm dev
   - or npm run dev
4. Visit http://localhost:3000

Optional:
- Add env vars to your local shell (e.g., NEXT_PUBLIC_MAPBOX_TOKEN) if you switch to Mapbox tiles.

## Using the App

- Mobile Civic Tracker
  - Located beside the “Empowering citizens building better india” text.
  - Tabs/sections for Ward‑wise, State‑wise, and Trends.
  - Filters at the top (date range, ward, state).
  - On mobile, tap a chart to smoothly expand within the same section without navigating away.
- India Issues Map
  - Interactive Leaflet map focused on India; sample pins in Southern India.
  - Replace or augment sample data to reflect live issues.
- Reporting Flow + IVR/SMS
  - See the Reporting Flow section (below WhatsApp integration) for the 4‑step process.
  - IVR and SMS flows documented in a simple, user‑friendly card.

## Customization

- Colors & Tokens: app/globals.css (use CSS variables like --background, --foreground, --primary)
- Fonts: app/layout.tsx (Next.js font imports; classes: font-sans, font-mono)
- Charts: components/mobile-civic-tracker.tsx (Recharts; smooth transitions enabled)
- Map: components/india-map-cluster.tsx (Leaflet layers, markers, pin locations)
- Footer credits: app/page.tsx footer section

## Data Integration

- Replace mocked data arrays in components with fetches to your APIs or databases.
- Use SWR for client caching or pass data from Server Components.
- Follow existing error/loading patterns in components.

## Deployment

- From v0: Click Publish in the top-right corner.
- From GitHub: Connect repo to Vercel and deploy with defaults.

## Troubleshooting

- Blank map: Check Leaflet CSS is loaded and there are no CSP errors; ensure container has a fixed height.
- Charts overlap on mobile: Ensure only one chart is expanded at a time (built-in state logic handles this; review mobile-civic-tracker.tsx).
- Env vars not available in client: Prefix with NEXT_PUBLIC_ and use only where required.

---

Built for transparent, citizen‑centric governance with a responsive, accessible, and modern UI.

