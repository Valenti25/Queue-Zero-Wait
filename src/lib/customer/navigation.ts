import type { CustomerBusiness } from "@/lib/customer/businesses";

export function queueTrackingHref(business: CustomerBusiness, ticketId?: string) {
  const id = ticketId ?? `demo-${Date.now()}`;
  return `/queue/${id}?business=${business.slug}`;
}

export function bookingConfirmedHref(business: CustomerBusiness) {
  return `/queue/booking-confirmed?business=${business.slug}`;
}
