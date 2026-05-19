import type {
  BankService,
  Business,
  ClinicService,
  CustomerFlowKind,
  FitnessClass,
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
  "bangkok-care-clinic": {
    id: "biz_clinic",
    slug: "bangkok-care-clinic",
    name: "Bangkok Care Clinic",
    industry: "clinic",
    flowKind: "clinic",
    icon: "🩺",
    contextLabel: "Appointment · triage queue",
    address: "42 Sukhumvit Rd, Bangkok",
    description: "Book a visit, check in on arrival, and follow triage stages on your phone.",
    bookingMode: "appointment",
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
    contextLabel: "Stylist booking · chair queue",
    address: "15 Nimman Rd, Chiang Mai",
    description: "Pick your service and stylist — we'll notify you when your chair is ready.",
    bookingMode: "both",
    avgWaitMinutes: 15,
    googleBusinessConnected: true,
  },
  "siam-trust-bank": {
    id: "biz_bank",
    slug: "siam-trust-bank",
    name: "Siam Trust Bank",
    industry: "bank",
    flowKind: "bank",
    icon: "🏦",
    contextLabel: "Branch visit · teller queue",
    address: "Silom branch · Floor 2, Bangkok",
    description: "Select your service and get a digital ticket — no paper slip needed.",
    bookingMode: "waitlist",
    avgWaitMinutes: 22,
    googleBusinessConnected: false,
  },
  "pulse-studio": {
    id: "biz_fitness",
    slug: "pulse-studio",
    name: "Pulse Studio",
    industry: "fitness",
    flowKind: "fitness",
    icon: "💪",
    contextLabel: "Class booking · limited spots",
    address: "88 Rama IV Rd, Bangkok",
    description: "Reserve your spot in a class — see live capacity before you commit.",
    bookingMode: "appointment",
    avgWaitMinutes: 0,
    googleBusinessConnected: true,
  },
};

export const DEMO_BUSINESS_SLUGS = Object.keys(DEMO_BUSINESSES);

export function getCustomerBusiness(slug: string): CustomerBusiness | null {
  return DEMO_BUSINESSES[slug] ?? null;
}

export const CLINIC_SERVICES: ClinicService[] = [
  { id: "general", label: "General medicine", durationMin: 30 },
  { id: "followup", label: "Follow-up visit", durationMin: 15 },
  { id: "vaccine", label: "Vaccination", durationMin: 20 },
];

export const CLINIC_TRIAGE_STAGES = ["Check-in", "Triage", "Consult"] as const;

export const SALON_SERVICES: SalonService[] = [
  { id: "cut", label: "Haircut", priceFrom: "฿450" },
  { id: "color", label: "Cut + color", priceFrom: "฿1,890" },
  { id: "treatment", label: "Treatment", priceFrom: "฿650" },
];

export const SALON_STYLISTS = ["Any available", "Mint", "June", "Alex"] as const;

export const BANK_SERVICES: BankService[] = [
  { id: "account", label: "New account · ID verification", estimatedWaitMin: 22 },
  { id: "loan", label: "Loan consultation", estimatedWaitMin: 35 },
  { id: "forex", label: "Foreign exchange", estimatedWaitMin: 12 },
];

export const FITNESS_CLASSES: FitnessClass[] = [
  {
    id: "yoga",
    name: "Yoga Flow",
    time: "Today · 6:30 PM",
    instructor: "Nina",
    spotsTotal: 12,
    spotsLeft: 3,
  },
  {
    id: "hiit",
    name: "HIIT Burn",
    time: "Today · 7:45 PM",
    instructor: "Kai",
    spotsTotal: 16,
    spotsLeft: 8,
  },
  {
    id: "spin",
    name: "Spin 45",
    time: "Tomorrow · 7:00 AM",
    instructor: "Pam",
    spotsTotal: 20,
    spotsLeft: 2,
  },
];
