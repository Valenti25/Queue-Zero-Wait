"use client";

import { Card } from "@/components/ui/card";
import { EatigoBookingPanel } from "@/components/booking/eatigo-booking-panel";
import type { PromotionSlot } from "@/lib/restaurant/types";

export function BookingWidget({
  slots,
}: {
  name?: string;
  slots: PromotionSlot[];
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 p-0 shadow-md" id="booking">
      <EatigoBookingPanel slots={slots} className="border-0 bg-transparent" />
    </Card>
  );
}
