"use client";

import type { ReactNode } from "react";
import { BookingConfirmedView } from "@/components/customer/queue/booking-confirmed-view";
import { ClassQueueTracker } from "@/components/customer/queue/class-queue-tracker";
import { PositionQueueTracker } from "@/components/customer/queue/position-queue-tracker";
import { TicketQueueTracker } from "@/components/customer/queue/ticket-queue-tracker";
import { TriageQueueTracker } from "@/components/customer/queue/triage-queue-tracker";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import type { CustomerFlowKind } from "@/types";

export function CustomerQueueRouter({
  business,
  ticketId,
}: {
  business: CustomerBusiness;
  ticketId: string;
}) {
  if (ticketId === "booking-confirmed") {
    return <BookingConfirmedView business={business} />;
  }

  const trackers: Record<CustomerFlowKind, ReactNode> = {
    restaurant: (
      <PositionQueueTracker business={business} ticketId={ticketId} showLiveQueue />
    ),
    clinic: <TriageQueueTracker business={business} ticketId={ticketId} />,
    salon: <PositionQueueTracker business={business} ticketId={ticketId} />,
    bank: (
      <TicketQueueTracker
        business={business}
        ticketId={ticketId}
        ticketNumber={ticketId.startsWith("A-") ? ticketId : "A-042"}
      />
    ),
    fitness: <ClassQueueTracker business={business} ticketId={ticketId} />,
  };

  return trackers[business.flowKind];
}
