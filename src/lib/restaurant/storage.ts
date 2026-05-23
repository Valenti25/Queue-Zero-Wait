import { createClient } from "@/lib/supabase/client";
import { STORAGE_KEYS } from "./constants";
import { SEED_RESTAURANTS } from "./seed";
import type { AuthRole, MockBookingMode, OwnerProfile, Restaurant } from "./types";

// ── DB row ↔ Restaurant mapping ──────────────────────────────

function toDbRow(r: Restaurant) {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    business_type: r.businessType,
    cuisine: r.cuisine ?? null,
    branch: r.branch ?? null,
    facebook_page_url: r.facebookPageUrl ?? null,
    description: r.description,
    address: r.address,
    phone: r.phone,
    map_embed_url: r.mapEmbedUrl ?? null,
    hours: r.hours,
    cover_photo: r.coverPhoto,
    gallery: r.gallery,
    promotion_slots: r.promotionSlots,
    menu: r.menu,
    reviews: r.reviews,
    rating: r.rating,
    reservations: r.reservations,
    price_range: r.priceRange ?? null,
    highlight_tags: r.highlightTags ?? null,
    highlight_bullets: r.highlightBullets ?? null,
    google_review_count: r.googleReviewCount ?? null,
    menu_disclaimer: r.menuDisclaimer ?? null,
    faqs: r.faqs ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDbRow(row: any): Restaurant {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    businessType: row.business_type,
    cuisine: row.cuisine ?? undefined,
    branch: row.branch ?? undefined,
    facebookPageUrl: row.facebook_page_url ?? undefined,
    description: row.description,
    address: row.address,
    phone: row.phone,
    mapEmbedUrl: row.map_embed_url ?? undefined,
    hours: row.hours,
    coverPhoto: row.cover_photo,
    gallery: row.gallery,
    promotionSlots: row.promotion_slots,
    menu: row.menu,
    reviews: row.reviews,
    rating: Number(row.rating),
    reservations: row.reservations,
    priceRange: row.price_range ?? undefined,
    highlightTags: row.highlight_tags ?? undefined,
    highlightBullets: row.highlight_bullets ?? undefined,
    googleReviewCount: row.google_review_count ?? undefined,
    menuDisclaimer: row.menu_disclaimer ?? undefined,
    faqs: row.faqs ?? undefined,
  };
}

// ── Restaurant CRUD (Supabase) ────────────────────────────────

export async function getRestaurants(): Promise<Restaurant[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("created_at", { ascending: true });
  if (error || !data || data.length === 0) return SEED_RESTAURANTS;
  return data.map(fromDbRow);
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return undefined;
  return fromDbRow(data);
}

export async function upsertRestaurant(restaurant: Restaurant): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const row = toDbRow(restaurant);
  if (user) (row as Record<string, unknown>).owner_id = user.id;
  const { error } = await supabase.from("restaurants").upsert(row, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

export async function saveRestaurants(list: Restaurant[]): Promise<void> {
  const supabase = createClient();
  await supabase
    .from("restaurants")
    .upsert(list.map(toDbRow), { onConflict: "slug" });
}

// ── Auth role (localStorage — mock auth) ─────────────────────

function browser() {
  return typeof window !== "undefined";
}

export function getAuthRole(): AuthRole {
  if (!browser()) return null;
  const v = localStorage.getItem(STORAGE_KEYS.authRole);
  return v === "owner" || v === "customer" ? v : null;
}

export function setAuthRole(role: AuthRole) {
  if (!browser()) return;
  if (role) localStorage.setItem(STORAGE_KEYS.authRole, role);
  else localStorage.removeItem(STORAGE_KEYS.authRole);
}

// ── Booking mode (localStorage) ───────────────────────────────

export function getBookingMode(): MockBookingMode {
  if (!browser()) return null;
  const v = localStorage.getItem(STORAGE_KEYS.bookingMode);
  return v === "reservation" || v === "waitlist" ? v : null;
}

export function setBookingMode(mode: MockBookingMode) {
  if (!browser()) return;
  if (mode) localStorage.setItem(STORAGE_KEYS.bookingMode, mode);
  else localStorage.removeItem(STORAGE_KEYS.bookingMode);
}

// ── Owner slugs (localStorage — mock ownership) ───────────────

export function getOwnerSlugs(): string[] {
  if (!browser()) return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ownerSlugs) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function addOwnerSlug(slug: string) {
  if (!browser()) return;
  const slugs = getOwnerSlugs().filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEYS.ownerSlugs, JSON.stringify([slug, ...slugs]));
}

export async function getOwnerRestaurants(): Promise<Restaurant[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true });
    return data?.map(fromDbRow) ?? [];
  }

  // Fallback for demo/unauthenticated mode
  const slugs = getOwnerSlugs();
  const results = await Promise.all(slugs.map(getRestaurantBySlug));
  return results.filter(Boolean) as Restaurant[];
}

// ── Owner profile (localStorage) ──────────────────────────────

export function getOwnerProfile(): OwnerProfile {
  if (!browser()) return { hasMultipleBranches: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ownerProfile);
    if (!raw) return { hasMultipleBranches: false };
    return JSON.parse(raw) as OwnerProfile;
  } catch {
    return { hasMultipleBranches: false };
  }
}

export function setOwnerProfile(profile: OwnerProfile) {
  if (!browser()) return;
  localStorage.setItem(STORAGE_KEYS.ownerProfile, JSON.stringify(profile));
}

export async function getPrimaryOwnerRestaurant(): Promise<Restaurant | undefined> {
  const owned = await getOwnerRestaurants();
  return owned[0];
}
