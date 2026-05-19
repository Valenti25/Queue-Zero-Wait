import type { Booking, OptionalAction, TimeSlot, WaitlistEntry } from "@/types";
import { DEMO_BUSINESSES } from "@/lib/customer/businesses";

export const DEMO_BUSINESS = DEMO_BUSINESSES["harbor-bistro"]!;

export const DEMO_TIME_SLOTS: TimeSlot[] = [
  { id: "1", time: "11:30 AM", available: true, capacity: 4 },
  { id: "2", time: "12:00 PM", available: true, capacity: 6 },
  { id: "3", time: "12:30 PM", available: false, capacity: 0 },
  { id: "4", time: "1:00 PM", available: true, capacity: 2 },
  { id: "5", time: "1:30 PM", available: true, capacity: 8 },
  { id: "6", time: "6:00 PM", available: true, capacity: 4 },
  { id: "7", time: "6:30 PM", available: true, capacity: 6 },
  { id: "8", time: "7:00 PM", available: false, capacity: 0 },
  { id: "9", time: "7:30 PM", available: true, capacity: 3 },
  { id: "10", time: "8:00 PM", available: true, capacity: 5 },
];

export const DEMO_OPTIONAL_ACTIONS: OptionalAction[] = [
  {
    id: "pre_order",
    type: "pre_order",
    label: "Pre-order food",
    description: "Browse the menu and order before you're seated",
    enabled: true,
  },
  {
    id: "form",
    type: "form",
    label: "Dietary preferences",
    description: "Let us know about allergies or special requests",
    enabled: true,
  },
  {
    id: "deposit",
    type: "deposit",
    label: "Hold with deposit",
    description: "Secure your spot with a refundable $10 deposit",
    enabled: false,
  },
  {
    id: "confirm",
    type: "confirm",
    label: "Confirm attendance",
    description: "Tap when you're on your way",
    enabled: true,
  },
];

export const DEMO_WAITLIST: WaitlistEntry[] = [
  { id: "w1", customerName: "Alex M.", partySize: 2, position: 1, waitMinutes: 5, status: "called", joinedAt: "12:10 PM" },
  { id: "w2", customerName: "Jordan K.", partySize: 4, position: 2, waitMinutes: 12, status: "waiting", joinedAt: "12:18 PM" },
  { id: "w3", customerName: "Sam L.", partySize: 2, position: 3, waitMinutes: 18, status: "waiting", joinedAt: "12:22 PM" },
  { id: "w4", customerName: "Taylor R.", partySize: 3, position: 4, waitMinutes: 24, status: "waiting", joinedAt: "12:28 PM" },
  { id: "w5", customerName: "You", partySize: 2, position: 5, waitMinutes: 30, status: "waiting", joinedAt: "12:35 PM" },
];

export const DEMO_BOOKINGS: Booking[] = [
  { id: "b1", businessId: "biz_demo", customerName: "Maria G.", customerEmail: "maria@email.com", date: "Today", time: "6:00 PM", partySize: 4, status: "confirmed" },
  { id: "b2", businessId: "biz_demo", customerName: "David P.", customerEmail: "david@email.com", date: "Today", time: "6:30 PM", partySize: 2, status: "pending" },
  { id: "b3", businessId: "biz_demo", customerName: "Lisa W.", customerEmail: "lisa@email.com", date: "Today", time: "7:00 PM", partySize: 6, status: "confirmed", notes: "Birthday celebration" },
  { id: "b4", businessId: "biz_demo", customerName: "James H.", customerEmail: "james@email.com", date: "Tomorrow", time: "12:00 PM", partySize: 2, status: "confirmed" },
];
