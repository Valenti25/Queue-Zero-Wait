"use client";

import { cn } from "@/lib/utils";
import { DiscountBadge } from "@/components/restaurant/discount-badge";
import type { PromotionSlot } from "@/lib/restaurant/types";

export function TimeSlotGrid({
  slots,
  selected,
  onSelect,
}: {
  slots: PromotionSlot[];
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          onClick={() => onSelect(slot.time)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3",
            selected === slot.time ? "border-[#E8193C] bg-[#E8193C]/5" : "border-border"
          )}
        >
          <span className="text-sm font-semibold">{slot.time}</span>
          <DiscountBadge discount={slot.discount} size="sm" />
        </button>
      ))}
    </div>
  );
}
