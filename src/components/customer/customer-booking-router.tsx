"use client";

import type { ReactNode } from "react";
import type { CustomerFlowKind } from "@/types";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { RestaurantFlow } from "@/components/customer/flows/restaurant-flow";
import { SalonFlow } from "@/components/customer/flows/salon-flow";
import { QueueAgentFlow } from "@/components/customer/flows/queue-agent-flow";

export function CustomerBookingRouter({ business }: { business: CustomerBusiness }) {
  const flows: Record<CustomerFlowKind, ReactNode> = {
    restaurant: <RestaurantFlow business={business} />,
    salon: <SalonFlow business={business} />,
    "queue-agent": <QueueAgentFlow business={business} />,
  };

  return flows[business.flowKind];
}
