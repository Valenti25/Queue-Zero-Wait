"use client";

import type { ReactNode } from "react";
import { BookingConfirmedView } from "@/components/customer/queue/booking-confirmed-view";
import { PositionQueueTracker } from "@/components/customer/queue/position-queue-tracker";
import { AgentQueueTracker } from "@/components/customer/queue/agent-queue-tracker";
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
    salon: <PositionQueueTracker business={business} ticketId={ticketId} />,
    "queue-agent": <AgentQueueTracker business={business} ticketId={ticketId} />,
  };

  return trackers[business.flowKind];
}
