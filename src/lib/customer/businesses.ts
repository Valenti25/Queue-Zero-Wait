import type {
  Business,
  CustomerFlowKind,
  SalonService,
} from "@/types";

export interface CustomerBusiness extends Business {
  flowKind: CustomerFlowKind;
  icon: string;
  contextLabel: string;
}

export const DEMO_BUSINESSES: Record<string, CustomerBusiness> = {
  "harbor-bistro": {
    id: "biz_harbor",
    slug: "harbor-bistro",
    name: "Harbor Bistro",
    industry: "restaurant",
    flowKind: "restaurant",
    icon: "🍽️",
    contextLabel: "Walk-in waitlist · table booking",
    address: "128 Waterfront Ave, San Francisco, CA",
    description: "Coastal cuisine with bay views. Reserve a table or join our walk-in waitlist.",
    bookingMode: "both",
    avgWaitMinutes: 18,
    googleBusinessConnected: true,
  },
  "luna-salon": {
    id: "biz_salon",
    slug: "luna-salon",
    name: "Luna Salon",
    industry: "salon",
    flowKind: "salon",
    icon: "✂️",
    contextLabel: "จองช่าง · คิวเก้าอี้",
    address: "15 Nimman Rd, Chiang Mai",
    description: "Pick your service and stylist — we'll notify you when your chair is ready.",
    bookingMode: "both",
    avgWaitMinutes: 15,
    googleBusinessConnected: true,
  },
  "tee-noi": {
    id: "biz_tee_noi",
    slug: "tee-noi",
    name: "ตี๋น้อย คลอง 6",
    industry: "restaurant",
    flowKind: "queue-agent",
    icon: "⭐",
    contextLabel: "Exclusive · จองได้ที่นี่ที่เดียว",
    address: "คลอง 6 ธัญบุรี ปทุมธานี",
    description: "ร้านก๋วยเตี๋ยวชื่อดัง เราช่วยกดบัตรคิวให้คุณ ไม่ต้องมาต่อเอง",
    bookingMode: "waitlist",
    avgWaitMinutes: 45,
    googleBusinessConnected: false,
  },
};

export const DEMO_BUSINESS_SLUGS = Object.keys(DEMO_BUSINESSES);

export function getCustomerBusiness(slug: string): CustomerBusiness | null {
  return DEMO_BUSINESSES[slug] ?? null;
}

export const SALON_SERVICES: SalonService[] = [
  { id: "cut", label: "ตัดผม", priceFrom: "฿450" },
  { id: "color", label: "ตัด + ทำสี", priceFrom: "฿1,890" },
  { id: "treatment", label: "ทรีทเม้นท์", priceFrom: "฿650" },
];

export const SALON_STYLISTS = ["ช่างใดก็ได้", "มิ้นท์", "จูน", "แอ็คซ์"] as const;

export const TEE_NOI_TIME_SLOTS = [
  { id: "ts_1000", time: "10:00", available: true },
  { id: "ts_1100", time: "11:00", available: true },
  { id: "ts_1200", time: "12:00", available: false },
  { id: "ts_1300", time: "13:00", available: true },
  { id: "ts_1400", time: "14:00", available: true },
  { id: "ts_1500", time: "15:00", available: true },
] as const;
