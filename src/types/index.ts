export type Industry =
  | "restaurant"
  | "clinic"
  | "salon"
  | "bank"
  | "fitness"
  | "automotive"
  | "events"
  | "government"
  | "other";

export type BookingMode = "appointment" | "waitlist" | "both";

/** Drives which customer booking + queue UI to render */
export type CustomerFlowKind = "restaurant" | "clinic" | "salon" | "bank" | "fitness";

export interface Business {
  id: string;
  slug: string;
  name: string;
  industry: Industry;
  address: string;
  imageUrl?: string;
  description?: string;
  bookingMode: BookingMode;
  avgWaitMinutes: number;
  googleBusinessConnected: boolean;
  /** UI variant for /book and /queue — defaults from industry when omitted */
  flowKind?: CustomerFlowKind;
}

export interface ClinicService {
  id: string;
  label: string;
  durationMin: number;
}

export interface SalonService {
  id: string;
  label: string;
  priceFrom: string;
}

export interface BankService {
  id: string;
  label: string;
  estimatedWaitMin: number;
}

export interface FitnessClass {
  id: string;
  name: string;
  time: string;
  instructor: string;
  spotsTotal: number;
  spotsLeft: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  capacity: number;
}

export interface QueueTicket {
  id: string;
  businessId: string;
  businessName: string;
  position: number;
  totalAhead: number;
  estimatedWaitMinutes: number;
  status: "waiting" | "called" | "served" | "cancelled" | "no_show";
  joinedAt: string;
  customerName: string;
}

export interface Booking {
  id: string;
  businessId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  partySize: number;
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no_show";
  notes?: string;
}

export interface WaitlistEntry {
  id: string;
  customerName: string;
  partySize: number;
  position: number;
  waitMinutes: number;
  status: "waiting" | "called" | "served" | "no_show";
  joinedAt: string;
}

export interface OptionalAction {
  id: string;
  type: "pre_order" | "form" | "deposit" | "confirm";
  label: string;
  description: string;
  enabled: boolean;
}
