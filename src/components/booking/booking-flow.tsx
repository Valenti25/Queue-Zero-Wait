"use client";

import { RestaurantFlow } from "@/components/customer/flows/restaurant-flow";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import type { Business } from "@/types";

export { OptionalActionsPanel };

function toCustomerBusiness(business: Business): CustomerBusiness {
  return {
    ...business,
    flowKind: "restaurant",
    icon: "🍽️",
    contextLabel: "Walk-in waitlist · table booking",
  };
}

/** @deprecated Use CustomerBookingRouter — kept for existing imports */
export function BookingFlow({ business }: { business: Business }) {
  return <RestaurantFlow business={toCustomerBusiness(business)} />;
}
