import { BUSINESS_TYPES, LOCAL_BASE, LIVE_BASE } from "./constants";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** ลิงก์ร้าน: ชื่อ-ประเภทกิจการ */
export function buildRestaurantSlug(name: string, businessTypeId: string): string {
  return [slugify(name), slugify(businessTypeId)].filter(Boolean).join("-");
}

export function getBusinessTypeLabel(businessTypeId: string): string {
  return BUSINESS_TYPES.find((b) => b.id === businessTypeId)?.label ?? businessTypeId;
}

/** รองรับข้อมูลเก่าที่ใช้ field cuisine */
export function getRestaurantBusinessType(r: {
  businessType?: string;
  cuisine?: string;
}): string {
  if (r.businessType) return r.businessType;
  const legacy = r.cuisine?.toLowerCase() ?? "";
  if (legacy.includes("clinic") || legacy.includes("คลินิก")) return "clinic";
  if (legacy.includes("salon")) return "salon";
  if (legacy.includes("bank")) return "bank";
  if (legacy.includes("fitness")) return "fitness";
  return "restaurant";
}

export function getRestaurantStorefrontPath(slug: string) {
  return `/r/${slug}`;
}

/** ลิงก์หน้าร้านที่ลูกค้าเปิดจอง — `current` = origin ที่เปิดอยู่ (localhost / Vercel จริง) */
export function getRestaurantStorefrontUrl(
  slug: string,
  base: "current" | "local" | "live" = "current"
) {
  const path = getRestaurantStorefrontPath(slug);
  if (base === "live") return `${LIVE_BASE}${path}`;
  if (base === "local") return `${LOCAL_BASE}${path}`;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return `${LOCAL_BASE}${path}`;
}

/** @deprecated ใช้ getRestaurantStorefrontUrl แทน */
export function getRestaurantPublicUrl(slug: string, base: "local" | "live" = "local") {
  return getRestaurantStorefrontUrl(slug, base);
}

export function getMaxDiscount(slots: { discount: number }[]): number {
  if (!slots.length) return 0;
  return Math.max(...slots.map((s) => s.discount));
}

export function formatPriceRange(level = 3): string {
  return "$".repeat(Math.min(4, Math.max(1, level)));
}

/** สรุประดับราคาจากเมนูที่กรอก (บาท) */
export function inferPriceFromMenu(menu: { price: number }[]): {
  level: number;
  label: string;
  symbols: string;
} {
  const prices = menu.map((m) => m.price).filter((p) => p > 0);
  if (!prices.length) {
    return { level: 0, label: "กรอกราคาเมนูเพื่อสรุประดับราคา", symbols: "" };
  }
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  if (avg < 180) {
    return { level: 1, label: "ราคาประหยัด", symbols: "$" };
  }
  if (avg < 350) {
    return { level: 2, label: "ราคาปานกลาง", symbols: "$$" };
  }
  if (avg < 550) {
    return { level: 3, label: "ค่อนข้างแพง", symbols: "$$$" };
  }
  return { level: 4, label: "ราคาแพง", symbols: "$$$$" };
}

export function formatPriceLevelDisplay(
  menu: { price: number }[],
  fallbackLevel = 3
): { label: string; symbols: string } {
  const inferred = inferPriceFromMenu(menu);
  if (inferred.level > 0) {
    return { label: inferred.label, symbols: inferred.symbols };
  }
  return {
    label: "ราคาปานกลาง",
    symbols: formatPriceRange(fallbackLevel),
  };
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
