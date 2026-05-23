-- ============================================================
-- Queue Zero Wait — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- ── restaurants ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS restaurants (
  id                  TEXT PRIMARY KEY,
  slug                TEXT UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  business_type       TEXT NOT NULL DEFAULT 'restaurant',
  cuisine             TEXT,
  branch              TEXT,
  facebook_page_url   TEXT,
  description         TEXT NOT NULL DEFAULT '',
  address             TEXT NOT NULL DEFAULT '',
  phone               TEXT NOT NULL DEFAULT '',
  map_embed_url       TEXT,
  hours               JSONB NOT NULL DEFAULT '[]',
  cover_photo         TEXT NOT NULL DEFAULT '',
  gallery             TEXT[] NOT NULL DEFAULT '{}',
  promotion_slots     JSONB NOT NULL DEFAULT '[]',
  menu                JSONB NOT NULL DEFAULT '[]',
  reviews             JSONB NOT NULL DEFAULT '[]',
  rating              NUMERIC(3,2) NOT NULL DEFAULT 0,
  reservations        INTEGER NOT NULL DEFAULT 0,
  price_range         INTEGER,
  highlight_tags      TEXT[],
  highlight_bullets   TEXT[],
  google_review_count INTEGER,
  menu_disclaimer     TEXT,
  faqs                JSONB,
  owner_id            UUID REFERENCES auth.users(id),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── queue_tickets ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS queue_tickets (
  id                       TEXT PRIMARY KEY,
  business_id              TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  business_name            TEXT NOT NULL,
  position                 INTEGER NOT NULL DEFAULT 0,
  total_ahead              INTEGER NOT NULL DEFAULT 0,
  estimated_wait_minutes   INTEGER NOT NULL DEFAULT 0,
  status                   TEXT NOT NULL DEFAULT 'waiting',
  queue_number             TEXT,
  joined_at                TEXT NOT NULL,
  customer_name            TEXT NOT NULL,
  customer_id              UUID REFERENCES auth.users(id),
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── bookings ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id             TEXT PRIMARY KEY,
  business_id    TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name  TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  date           TEXT NOT NULL,
  time           TEXT NOT NULL,
  party_size     INTEGER NOT NULL DEFAULT 1,
  status         TEXT NOT NULL DEFAULT 'pending',
  pricing_tier   TEXT,
  notes          TEXT,
  customer_id    UUID REFERENCES auth.users(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── waitlist_entries ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id            TEXT PRIMARY KEY,
  business_id   TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  party_size    INTEGER NOT NULL DEFAULT 1,
  position      INTEGER NOT NULL DEFAULT 0,
  wait_minutes  INTEGER NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'waiting',
  joined_at     TEXT NOT NULL,
  customer_id   UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── owner_restaurants (for future Supabase Auth) ──────────────
CREATE TABLE IF NOT EXISTS owner_restaurants (
  owner_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_slug TEXT NOT NULL REFERENCES restaurants(slug) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (owner_id, restaurant_slug)
);

-- ── updated_at trigger ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER queue_tickets_updated_at
  BEFORE UPDATE ON queue_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Realtime ──────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE queue_tickets;

-- ── RLS (disabled for MVP demo — enable & add policies in production) ──
ALTER TABLE restaurants      DISABLE ROW LEVEL SECURITY;
ALTER TABLE queue_tickets     DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings          DISABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_entries  DISABLE ROW LEVEL SECURITY;
ALTER TABLE owner_restaurants DISABLE ROW LEVEL SECURITY;
