"use client";

import { CustomerQueueRouter } from "@/components/customer/customer-queue-router";
import { getCustomerBusiness } from "@/lib/customer/businesses";
import { DEMO_BUSINESS } from "@/lib/mock-data";

/** @deprecated Prefer CustomerQueueRouter with ?business= slug */
export function QueueTracker({
  ticketId,
  businessSlug = DEMO_BUSINESS.slug,
}: {
  ticketId: string;
  businessSlug?: string;
}) {
  const business = getCustomerBusiness(businessSlug) ?? DEMO_BUSINESS;

  return <CustomerQueueRouter business={business} ticketId={ticketId} />;
}
