"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PromotionSlot } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";

function formatDisplayDate(iso: string) {
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export interface BookingSelection {
  party: string;
  date: string;
  time: string | null;
  discount: number | null;
}

export function EatigoBookingPanel({
  slots,
  title = "จองโต๊ะ",
  className,
  showBookButton = false,
  showFooterNext = false,
  compact = false,
  hideTitle = false,
  appearance = "default",
  onNext,
}: {
  slots: PromotionSlot[];
  title?: string;
  className?: string;
  showBookButton?: boolean;
  /** แถวล่าง: สรุปซ้าย + ปุ่ม Next ขวา (แบบ Eatigo) */
  showFooterNext?: boolean;
  compact?: boolean;
  hideTitle?: boolean;
  /** หน้าลูกค้า — ปุ่มเลือกแบบ Eatigo ไม่ใช่ฟอร์มแก้ไข */
  appearance?: "default" | "customer";
  /** Callback when customer clicks Next — receives the current selection */
  onNext?: (selection: BookingSelection) => void;
}) {
  const [party, setParty] = useState("2");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string | null>(slots[0]?.time ?? null);

  const selectedSlot = slots.find((s) => s.time === time);
  const discount = selectedSlot?.discount ?? null;

  const dateLabel = useMemo(() => formatDisplayDate(date), [date]);
  const isCustomer = appearance === "customer";
  const inputH = compact ? "h-9" : "h-11";
  const slotSize = compact ? "h-[3.5rem] w-[3.5rem]" : "h-[4.5rem] w-[4.5rem]";
  const fieldClass = isCustomer
    ? "rounded-lg border border-border/80 bg-background shadow-sm"
    : "rounded-lg border border-input bg-background shadow-none";

  return (
    <div className={cn(className)}>
      {!hideTitle ? (
        <h2 className={cn("font-bold text-foreground", compact ? "text-sm" : "text-base")}>
          {title}
        </h2>
      ) : null}

      <div className={cn("grid grid-cols-2 gap-2", hideTitle || compact ? "mt-0" : "mt-3")}>
        <Select value={party} onValueChange={(v) => v && setParty(v)}>
          <SelectTrigger className={cn(inputH, "w-full min-w-0", fieldClass)}>
            <span className="flex items-center gap-2 truncate text-sm">
              <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} {n === 1 ? "Person" : "People"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className={cn("relative flex min-w-0 items-center px-3", fieldClass, inputH)}>
          <Calendar className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      {slots.length > 0 ? (
        <div className={cn(compact ? "mt-3" : "mt-4")}>
          <div className="-mx-0.5 flex gap-2.5 overflow-x-auto px-0.5 pb-1">
            {slots.map((slot) => {
              const active = time === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setTime(slot.time)}
                  className={cn(
                    "flex shrink-0 flex-col items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground text-center transition-all",
                    slotSize,
                    active && "scale-105 shadow-md ring-2 ring-primary/30"
                  )}
                >
                  <span className="text-sm font-semibold leading-none">{slot.time}</span>
                  <span className="mt-1 text-[11px] font-medium leading-none">
                    -{slot.discount}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          {isCustomer ? "ยังไม่มีช่วงเวลาโปรโมชั่น" : "เพิ่มโปรโมชั่นเวลาในข้อมูลพื้นฐาน"}
        </p>
      )}

      {showFooterNext ? (
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
          <div className="min-w-0 text-sm">
            <p className="font-medium text-foreground">
              {party} {party === "1" ? "Person" : "People"}
            </p>
            <p className="text-xs text-muted-foreground">
              {dateLabel}, {time ?? "--:--"} / {discount != null ? `-${discount}%` : "--%"}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            className="shrink-0 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
            onClick={() => onNext?.({ party, date, time, discount })}
          >
            Next
            <ChevronRight className="ml-0.5 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className={cn("border-t border-border/50", compact ? "mt-2 pt-2" : "mt-4 pt-3")}>
          <p className="text-sm font-medium text-foreground">
            {party} {party === "1" ? "Person" : "People"}
          </p>
          <p className="text-xs text-muted-foreground">
            {dateLabel}, {time ?? "--:--"}
            {discount != null ? ` / -${discount}%` : " / --%"}
          </p>
        </div>
      )}

      {showBookButton ? (
        <Button type="button" className="mt-4 h-11 w-full text-base font-semibold" size="lg">
          จองเลย
        </Button>
      ) : null}
    </div>
  );
}
