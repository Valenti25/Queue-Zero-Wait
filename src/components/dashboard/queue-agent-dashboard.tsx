"use client";

import { useState } from "react";
import { Bell, Clock, Star, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentRequestCard } from "@/components/agent/agent-request-card";
import type { AgentRequest } from "@/components/agent/agent-request-card";
import type { Restaurant } from "@/lib/restaurant/types";

const INITIAL_REQUESTS: AgentRequest[] = [
  {
    id: "req_1",
    customerName: "สมชาย จันทร์ดี",
    customerPhone: "081-234-5678",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "12:00",
    createdAt: "11:32",
    status: "pending",
  },
  {
    id: "req_2",
    customerName: "นภา สมใจ",
    customerPhone: "089-876-5432",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "12:00",
    createdAt: "11:40",
    status: "pending",
  },
  {
    id: "req_3",
    customerName: "กาญจนา ศรีสุข",
    customerPhone: "062-111-2233",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "13:00",
    createdAt: "11:55",
    status: "accepted",
  },
  {
    id: "req_4",
    customerName: "ธีรพงษ์ ทองคำ",
    customerPhone: "091-555-6677",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "11:00",
    createdAt: "10:12",
    status: "done",
    queueNumber: "A-061",
  },
  {
    id: "req_5",
    customerName: "วรรณา ดีใจ",
    customerPhone: "083-444-5566",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "11:00",
    createdAt: "10:22",
    status: "done",
    queueNumber: "A-062",
  },
];

export function QueueAgentDashboard({ restaurant }: { restaurant: Restaurant }) {
  const [requests, setRequests] = useState<AgentRequest[]>(INITIAL_REQUESTS);
  const [notified, setNotified] = useState(false);

  const pending = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const done = requests.filter((r) => r.status === "done").length;

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "accepted" as const } : r))
    );
  };

  const handleSubmitTicket = (id: string, number: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "done" as const, queueNumber: number } : r
      )
    );
  };

  const stats = [
    { label: "รอ agent", value: String(pending), sub: "ต้องรับงาน", icon: Bell, color: "text-amber-500" },
    { label: "กำลังไปกด", value: String(accepted), sub: "กำลังดำเนินการ", icon: Zap, color: "text-brand-500" },
    { label: "เสร็จวันนี้", value: String(done), sub: "ส่งเลขคิวแล้ว", icon: Users, color: "text-accent-emerald" },
    { label: "เฉลี่ย", value: "12m", sub: "ตั้งแต่จองถึงได้คิว", icon: Clock, color: "text-accent-cyan" },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-brand-500/20 bg-linear-to-br from-brand-500/10 via-brand-500/5 to-transparent p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-500">
              <Star className="h-6 w-6 fill-current" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold sm:text-2xl">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-brand-500">บริการตี๋น้อย</span> · Exclusive · ไม่มีลิงก์ Google
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pending > 0 && (
              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
                <Bell className="h-3 w-3" />
                {pending} รอรับงาน
              </span>
            )}
            <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
              เสร็จวันนี้: {done}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/60 bg-card/50">
            <CardContent className="p-4">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <p className="mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs font-medium text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-base">คิวสด — รับงานได้เลย</CardTitle>
                <button
                  type="button"
                  onClick={() => setNotified((n) => !n)}
                  className={`rounded-full p-1.5 transition-colors ${notified ? "bg-brand-500/15 text-brand-500" : "text-muted-foreground hover:bg-muted"}`}
                  title="แจ้งเตือนเมื่อมีคิวใหม่"
                >
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {requests.filter((r) => r.status !== "done").map((req) => (
                <AgentRequestCard
                  key={req.id}
                  request={req}
                  onAccept={handleAccept}
                  onSubmitTicket={handleSubmitTicket}
                />
              ))}
              {requests.filter((r) => r.status !== "done").length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  ไม่มีคิวที่รอดำเนินการ
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Done today */}
        <div>
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base">เสร็จแล้ววันนี้</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {requests
                .filter((r) => r.status === "done")
                .map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-xl border border-accent-emerald/20 bg-accent-emerald/5 px-3 py-2.5"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{req.customerName}</p>
                      <p className="text-[11px] text-muted-foreground">{req.requestedTime} · {req.createdAt}</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-accent-emerald">
                      {req.queueNumber}
                    </span>
                  </div>
                ))}
              {requests.filter((r) => r.status === "done").length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">ยังไม่มีรายการ</p>
              )}
            </CardContent>
          </Card>

          {/* Tip card */}
          <Card className="mt-3 border-brand-500/20 bg-brand-500/5">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-brand-500">คำแนะนำ</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                รับงานก่อนออกเดินทาง — ลูกค้าจะเห็น status "กำลังไปกด" ทันที
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
