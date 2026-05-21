"use client";

import { useState } from "react";
import {
  CalendarClock,
  Clock,
  TrendingDown,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/lib/restaurant/types";

const TIMELINE_SLOTS = [
  { time: "11:00", name: "สมชาย จันทร์ดี", party: 2, status: "seated" },
  { time: "11:30", name: "นภา สมใจ", party: 4, status: "confirmed" },
  { time: "12:00", name: "วรรณา ดีใจ", party: 2, status: "confirmed" },
  { time: "12:30", name: null, party: 0, status: "open" },
  { time: "13:00", name: "ธีรพงษ์ ทองคำ", party: 6, status: "confirmed" },
  { time: "13:30", name: null, party: 0, status: "open" },
  { time: "14:00", name: "กาญจนา ศรีสุข", party: 3, status: "confirmed" },
  { time: "14:30", name: null, party: 0, status: "open" },
  { time: "18:00", name: "ประเสริฐ มีสุข", party: 5, status: "confirmed" },
  { time: "18:30", name: "อรุณี วงศ์งาม", party: 2, status: "confirmed" },
  { time: "19:00", name: "สุรชัย แสงทอง", party: 4, status: "confirmed" },
  { time: "19:30", name: null, party: 0, status: "open" },
];

const TABLES = [
  { id: 1, seats: 2, status: "occupied" },
  { id: 2, seats: 4, status: "available" },
  { id: 3, seats: 2, status: "occupied" },
  { id: 4, seats: 6, status: "reserved" },
  { id: 5, seats: 4, status: "available" },
  { id: 6, seats: 8, status: "reserved" },
  { id: 7, seats: 2, status: "available" },
  { id: 8, seats: 4, status: "occupied" },
];

export function RestaurantDashboard({ restaurant }: { restaurant: Restaurant }) {
  const [filter, setFilter] = useState<"all" | "open" | "confirmed">("all");

  const filtered = TIMELINE_SLOTS.filter((s) =>
    filter === "all" ? true : filter === "open" ? s.status === "open" : s.status !== "open"
  );

  const stats = [
    { label: "โต๊ะว่าง", value: "5/8", sub: "วันนี้", icon: UtensilsCrossed },
    { label: "จองวันนี้", value: "24", sub: "+3 จากเมื่อวาน", icon: CalendarClock },
    { label: "คิวรอ", value: "4", sub: "กำลังรออยู่", icon: Users },
    { label: "avg wait", value: "18m", sub: "ลดลง 3 นาที", icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
              <UtensilsCrossed className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold sm:text-2xl">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-amber-500">บริการร้านอาหาร</span> · เปิดให้บริการ
              </p>
            </div>
          </div>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
            วันนี้: 24 จอง
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/50">
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-amber-500" />
              <p className="mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs font-medium text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="font-display text-base">Timeline วันนี้</CardTitle>
                <div className="flex gap-1">
                  {(["all", "open", "confirmed"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                        filter === f
                          ? "bg-amber-500/15 text-amber-500"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {f === "all" ? "ทั้งหมด" : f === "open" ? "ว่าง" : "จองแล้ว"}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1.5">
                {filtered.map((slot, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      slot.status === "open"
                        ? "border border-dashed border-border/50 text-muted-foreground"
                        : slot.status === "seated"
                          ? "bg-amber-500/10 border border-amber-500/20"
                          : "bg-muted/40 border border-transparent"
                    )}
                  >
                    <span className="w-12 shrink-0 font-mono text-xs font-semibold text-muted-foreground">
                      {slot.time}
                    </span>
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        slot.status === "open"
                          ? "bg-muted-foreground/30"
                          : slot.status === "seated"
                            ? "bg-amber-500"
                            : "bg-accent-emerald"
                      )}
                    />
                    {slot.status === "open" ? (
                      <span className="text-xs">ว่าง</span>
                    ) : (
                      <>
                        <span className="flex-1 truncate font-medium text-foreground">
                          {slot.name}
                        </span>
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                          {slot.party} คน
                        </span>
                        {slot.status === "seated" && (
                          <span className="shrink-0 text-[10px] font-semibold text-amber-500">
                            นั่งอยู่
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table grid */}
        <div>
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">สถานะโต๊ะ</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {TABLES.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-colors",
                      t.status === "available"
                        ? "border-accent-emerald/30 bg-accent-emerald/8"
                        : t.status === "occupied"
                          ? "border-amber-500/30 bg-amber-500/8"
                          : "border-border/60 bg-muted/30"
                    )}
                  >
                    <p className="text-xs font-semibold text-foreground">โต๊ะ {t.id}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{t.seats} ที่นั่ง</p>
                    <span
                      className={cn(
                        "mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium",
                        t.status === "available"
                          ? "bg-accent-emerald/15 text-accent-emerald"
                          : t.status === "occupied"
                            ? "bg-amber-500/15 text-amber-500"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {t.status === "available"
                        ? "ว่าง"
                        : t.status === "occupied"
                          ? "มีลูกค้า"
                          : "จองแล้ว"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accent-emerald" />ว่าง 3
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />มีลูกค้า 3
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />จอง 2
                </span>
              </div>
            </CardContent>
          </Card>

          {/* No-show tracker */}
          <Card className="mt-3 border-border/60 bg-card/50">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs font-medium text-foreground">No-show วันนี้</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">เปรียบกับเมื่อวาน</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums">4%</p>
                <p className="flex items-center justify-end gap-0.5 text-[11px] text-accent-emerald">
                  <TrendingDown className="h-3 w-3" />
                  ↓1%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
