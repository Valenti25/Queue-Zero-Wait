import { STORAGE_KEYS } from "./constants";
import { SEED_RESTAURANTS } from "./seed";
import type { AuthRole, MockBookingMode, OwnerProfile, Restaurant } from "./types";

function browser() {
  return typeof window !== "undefined";
}

export function getRestaurants(): Restaurant[] {
  if (!browser()) return SEED_RESTAURANTS;
  const raw = localStorage.getItem(STORAGE_KEYS.restaurants);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.restaurants, JSON.stringify(SEED_RESTAURANTS));
    return SEED_RESTAURANTS;
  }
  try {
    return JSON.parse(raw) as Restaurant[];
  } catch {
    return SEED_RESTAURANTS;
  }
}

export function saveRestaurants(list: Restaurant[]) {
  if (!browser()) return;
  localStorage.setItem(STORAGE_KEYS.restaurants, JSON.stringify(list));
}

export function getRestaurantBySlug(slug: string) {
  return getRestaurants().find((r) => r.slug === slug);
}

export function upsertRestaurant(restaurant: Restaurant) {
  const list = getRestaurants();
  const i = list.findIndex((r) => r.slug === restaurant.slug);
  if (i >= 0) list[i] = restaurant;
  else list.push(restaurant);
  saveRestaurants(list);
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
  // ใส่ slug ใหม่ไว้หน้าสุด — ร้านล่าสุดที่ register จะเป็น primary เสมอ
  const slugs = getOwnerSlugs().filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEYS.ownerSlugs, JSON.stringify([slug, ...slugs]));
}

export function getOwnerRestaurants(): Restaurant[] {
  return getOwnerSlugs()
    .map((s) => getRestaurantBySlug(s))
    .filter(Boolean) as Restaurant[];
}

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

export function getPrimaryOwnerRestaurant(): Restaurant | undefined {
  const owned = getOwnerRestaurants();
  return owned[0];
}
