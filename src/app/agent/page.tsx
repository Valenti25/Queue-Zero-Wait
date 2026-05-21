"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { AgentRequestCard, type AgentRequest } from "@/components/agent/agent-request-card";

const MOCK_REQUESTS: AgentRequest[] = [
  {
    id: "req_001",
    customerName: "สมชาย",
    customerPhone: "081-234-5678",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "11:00",
    createdAt: "09:42",
    status: "pending",
  },
  {
    id: "req_002",
    customerName: "นภา",
    customerPhone: "082-345-6789",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "11:00",
    createdAt: "09:44",
    status: "pending",
  },
  {
    id: "req_003",
    customerName: "ธีรพงษ์",
    customerPhone: "083-456-7890",
    businessName: "ตี๋น้อย คลอง 6",
    businessAddress: "คลอง 6 ธัญบุรี ปทุมธานี",
    requestedTime: "10:00",
    createdAt: "09:10",
    status: "done",
    queueNumber: "A-061",
  },
];

export default function AgentPage() {
  const [requests, setRequests] = useState<AgentRequest[]>(MOCK_REQUESTS);
  const [lastRefresh, setLastRefresh] = useState(new Date());

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

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <div className="mx-auto max-w-sm px-4 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm pt-6 pb-3 border-b border-border/40 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              อัปเดต{" "}
              {lastRefresh.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card hover:bg-muted transition-colors"
            aria-label="Refresh"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "รอรับ", value: pending, color: "text-amber-500" },
            { label: "กำลังทำ", value: accepted, color: "text-accent-cyan" },
            { label: "เสร็จ", value: done, color: "text-accent-emerald" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-border/40 bg-card/60 p-2.5 text-center"
            >
              <p className={`text-xl font-bold tabular-nums ${color}`}>{value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notification hint */}
      {pending > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3"
        >
          <Bell className="h-4 w-4 text-amber-500 shrink-0" />
          <p className="text-xs text-foreground">
            มี <span className="font-bold text-amber-500">{pending} งานใหม่</span> รอรับ
          </p>
        </motion.div>
      )}

      {/* Request list */}
      <div className="space-y-3">
        {/* Pending first */}
        {requests
          .filter((r) => r.status !== "done")
          .map((request) => (
            <AgentRequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onSubmitTicket={handleSubmitTicket}
            />
          ))}

        {/* Done section */}
        {done > 0 && (
          <>
            <div className="flex items-center gap-2 pt-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald" />
              <p className="text-xs font-medium text-muted-foreground">เสร็จแล้ววันนี้</p>
            </div>
            {requests
              .filter((r) => r.status === "done")
              .map((request) => (
                <AgentRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onSubmitTicket={handleSubmitTicket}
                />
              ))}
          </>
        )}

        {requests.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">ยังไม่มีงานใหม่</p>
          </div>
        )}
      </div>
    </div>
  );
}
