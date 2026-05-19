# Queue-Zero-Wait

A Google-first booking and waitlist SaaS platform built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Supabase.

## Features

- **Landing page** — Hero, features, industries, pricing, FAQ, and CTA
- **Customer booking** — Reserve time slots or join a live waitlist (`/book/[slug]`)
- **Queue tracking** — Real-time position, wait estimates, optional actions (`/queue/[id]`)
- **Merchant dashboard** — Manage waitlist, bookings, Google Profile links (`/dashboard`)
- **Auth** — Login and signup pages (Supabase-ready)

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/pricing` | Pricing plans |
| `/login` · `/signup` | Authentication |
| `/book/harbor-bistro` | Customer booking demo |
| `/queue/demo` | Live queue tracking demo |
| `/dashboard` | Merchant dashboard |

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion
- Supabase (client, server, middleware)

## Project structure

```
src/
├── app/              # Routes (marketing, auth, book, queue, dashboard)
├── components/       # UI, landing, booking, queue, merchant, layout
├── hooks/            # Client hooks (queue simulation)
├── lib/              # Constants, mock data, Supabase clients
└── types/            # Shared TypeScript types
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. Enable Realtime on your `queue_tickets` table for live updates
