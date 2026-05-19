"use client";

import type { ReactNode } from "react";
import type { CustomerFlowKind } from "@/types";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { BankFlow } from "@/components/customer/flows/bank-flow";
import { ClinicFlow } from "@/components/customer/flows/clinic-flow";
import { FitnessFlow } from "@/components/customer/flows/fitness-flow";
import { RestaurantFlow } from "@/components/customer/flows/restaurant-flow";
import { SalonFlow } from "@/components/customer/flows/salon-flow";

export function CustomerBookingRouter({ business }: { business: CustomerBusiness }) {
  const flows: Record<CustomerFlowKind, ReactNode> = {
    restaurant: <RestaurantFlow business={business} />,
    clinic: <ClinicFlow business={business} />,
    salon: <SalonFlow business={business} />,
    bank: <BankFlow business={business} />,
    fitness: <FitnessFlow business={business} />,
  };

  return flows[business.flowKind];
}
