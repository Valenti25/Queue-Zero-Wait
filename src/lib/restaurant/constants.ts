import type { Industry } from "@/types";

export const STORAGE_KEYS = {
  restaurants: "qzw_restaurants",
  authRole: "qzw_auth_role",
  bookingMode: "qzw_booking_mode",
  ownerSlugs: "qzw_owner_slugs",
  ownerProfile: "qzw_owner_profile",
} as const;

/** ประเภทกิจการ — สอดคล้องกับหน้าแลนดิ้ง (ไม่จำกัดร้านอาหาร) */
export const BUSINESS_TYPES: {
  id: Industry | "other";
  label: string;
}[] = [
  { id: "restaurant", label: "ร้านอาหาร" },
  { id: "clinic", label: "คลินิกและโรงพยาบาล" },
  { id: "salon", label: "ร้านเสริมสวยและบาร์เบอร์" },
  { id: "bank", label: "ธนาคารและการเงิน" },
  { id: "fitness", label: "คลาสฟิตเนสและสตูดิโอ" },
  { id: "automotive", label: "ศูนย์บริการรถ" },
  { id: "events", label: "อีเวนต์และงาน" },
  { id: "government", label: "หน่วยงานราชการ" },
  { id: "other", label: "ธุรกิจบริการอื่นๆ" },
];

export const LOCAL_BASE = "http://localhost:3000";
export const LIVE_BASE = "https://queue-zero-wait.vercel.app";

export const PARTNER_CATEGORIES = [
  { id: "all", label: "ทั้งหมด", emoji: "✨" },
  ...BUSINESS_TYPES.map((b) => ({
    id: b.id,
    label: b.label,
    emoji:
      b.id === "restaurant"
        ? "🍽️"
        : b.id === "clinic"
          ? "🏥"
          : b.id === "salon"
            ? "✂️"
            : b.id === "bank"
              ? "🏦"
              : b.id === "fitness"
                ? "💪"
                : "📍",
  })),
] as const;

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const REVIEW_TAGS = [
  "Great food",
  "Good service",
  "Clean place",
  "Good value",
  "Nice ambiance",
] as const;

export const MOCK_BOOKING_MODES = [
  {
    id: "reservation" as const,
    label: "จองล่วงหน้า (Appointment)",
    desc: "เลือกวัน เวลา และจำนวนคน / สล็อต",
  },
  {
    id: "waitlist" as const,
    label: "เข้าคิว (Waitlist)",
    desc: "รอคิวแบบ walk-in แบบเรียลไทม์",
  },
] as const;
