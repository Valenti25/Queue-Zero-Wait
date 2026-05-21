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
export type CustomerFlowKind = "restaurant" | "salon" | "queue-agent";

export type PricingTier = "premium" | "single" | "free";

export type AgentStatus = "pending_agent" | "agent_dispatched" | "ticket_received";

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

export interface SalonService {
  id: string;
  label: string;
  priceFrom: string;
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
  status: "waiting" | "called" | "served" | "cancelled" | "no_show" | "pending_agent" | "agent_dispatched" | "ticket_received";
  queueNumber?: string;
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
  pricingTier?: PricingTier;
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
