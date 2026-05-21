"use client";

import { CalendarDays, Scissors, Star, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/lib/restaurant/types";

const STYLISTS = [
  {
    name: "อ้อย",
    color: "bg-rose-500",
    slots: [
      { time: "10:00", customer: "นภา", service: "ทำสี", done: true },
      { time: "11:30", customer: "อรุณี", service: "ตัดผม", done: false },
      { time: "13:00", customer: null, service: null, done: false },
      { time: "14:30", customer: "กาญจนา", service: "ทำเล็บ", done: false },
    ],
  },
  {
    name: "ปอ",
    color: "bg-fuchsia-500",
    slots: [
      { time: "10:00", customer: null, service: null, done: false },
      { time: "11:30", customer: "สมชาย", service: "ตัดผม", done: true },
      { time: "13:00", customer: "วรรณา", service: "ดัดผม", done: false },
      { time: "14:30", customer: "ธีรพงษ์", service: "ตัดผม", done: false },
    ],
  },
  {
    name: "จิ",
    color: "bg-pink-500",
    slots: [
      { time: "10:00", customer: "ประเสริฐ", service: "ตัดผม", done: true },
      { time: "11:30", customer: "สุรชัย", service: "ทำสี", done: true },
      { time: "13:00", customer: "นภา 2", service: "ตัดผม", done: false },
      { time: "14:30", customer: null, service: null, done: false },
    ],
  },
  {
    name: "แป้ง",
    color: "bg-violet-500",
    slots: [
      { time: "10:00", customer: null, service: null, done: false },
      { time: "11:30", customer: null, service: null, done: false },
      { time: "13:00", customer: "กนก", service: "ทำสี + ดัด", done: false },
      { time: "14:30", customer: "มาลี", service: "ทำสี", done: false },
    ],
  },
];

const UPCOMING = [
  { time: "13:00", customer: "วรรณา ดีใจ", stylist: "ปอ", service: "ดัดผม", status: "confirmed" },
  { time: "13:00", customer: "นภา 2", stylist: "จิ", service: "ตัดผม", status: "confirmed" },
  { time: "13:00", customer: "กนก สงวน", stylist: "แป้ง", service: "ทำสี + ดัด", status: "pending" },
  { time: "14:30", customer: "กาญจนา ศรี", stylist: "อ้อย", service: "ทำเล็บ", status: "confirmed" },
  { time: "14:30", customer: "ธีรพงษ์ ทอง", stylist: "ปอ", service: "ตัดผม", status: "confirmed" },
];

export function SalonDashboard({ restaurant }: { restaurant: Restaurant }) {
  const stats = [
    { label: "นัดวันนี้", value: "9", sub: "+2 จากเมื่อวาน", icon: CalendarDays },
    { label: "ช่างว่าง", value: "2/4", sub: "ตอนนี้", icon: Scissors },
    { label: "รอยืนยัน", value: "3", sub: "ต้องตอบกลับ", icon: Star },
    { label: "รายได้วันนี้", value: "2,400", sub: "บาท (ประมาณ)", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-rose-500/20 bg-linear-to-br from-rose-500/10 via-rose-500/5 to-transparent p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-500">
              <Scissors className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold sm:text-2xl">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-rose-500">บริการร้านเสริมสวย</span> · ช่าง 4 คน
              </p>
            </div>
          </div>
          <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500">
            นัดวันนี้: 9
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/50">
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-rose-500" />
              <p className="mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs font-medium text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Staff schedule grid */}
        <div className="lg:col-span-3">
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">ตารางช่าง วันนี้</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Time header */}
              <div className="mb-2 grid grid-cols-5 gap-1.5 pl-16">
                {["10:00", "11:30", "13:00", "14:30"].map((t) => (
                  <div key={t} className="text-center text-[10px] font-semibold text-muted-foreground">
                    {t}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {STYLISTS.map((stylist) => (
                  <div key={stylist.name} className="grid grid-cols-5 items-center gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                          stylist.color
                        )}
                      >
                        {stylist.name.charAt(0)}
                      </span>
                      <span className="text-xs font-medium">{stylist.name}</span>
                    </div>
                    {stylist.slots.map((slot, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-lg px-2 py-2 text-center text-[10px] transition-colors",
                          slot.customer === null
                            ? "border border-dashed border-border/40 text-muted-foreground/40"
                            : slot.done
                              ? "bg-muted/60 text-muted-foreground line-through"
                              : "bg-rose-500/10 border border-rose-500/20 text-rose-500 font-medium"
                        )}
                      >
                        {slot.customer ?? "ว่าง"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />มีนัด
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />เสร็จแล้ว
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-3 rounded-sm border border-dashed border-muted-foreground/40" />ว่าง
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming appointments */}
        <div className="lg:col-span-2">
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">นัดที่กำลังมาถึง</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {UPCOMING.map((appt, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 transition-colors",
                      appt.status === "pending"
                        ? "border-amber-500/30 bg-amber-500/5"
                        : "border-border/60 bg-muted/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {appt.customer}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {appt.stylist} · {appt.service}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-mono font-semibold text-foreground">{appt.time}</p>
                        {appt.status === "pending" && (
                          <span className="text-[10px] font-medium text-amber-500">รอยืนยัน</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
