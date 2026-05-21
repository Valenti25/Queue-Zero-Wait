"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock, MapPin, Navigation, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type AgentRequestStatus = "pending" | "accepted" | "done";

export interface AgentRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  businessName: string;
  businessAddress: string;
  requestedTime: string;
  createdAt: string;
  status: AgentRequestStatus;
  queueNumber?: string;
}

interface AgentRequestCardProps {
  request: AgentRequest;
  onAccept: (id: string) => void;
  onSubmitTicket: (id: string, number: string) => void;
}

export function AgentRequestCard({ request, onAccept, onSubmitTicket }: AgentRequestCardProps) {
  const [ticketInput, setTicketInput] = useState("");
  const [expanded, setExpanded] = useState(request.status === "pending");

  const handleSubmit = () => {
    if (!ticketInput.trim()) return;
    onSubmitTicket(request.id, ticketInput.trim());
  };

  return (
    <motion.div
      layout
      className={cn(
        "rounded-2xl border overflow-hidden transition-colors",
        request.status === "done"
          ? "border-accent-emerald/30 bg-accent-emerald/5"
          : request.status === "accepted"
            ? "border-accent-cyan/30 bg-accent-cyan/5"
            : "border-border/60 bg-card"
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
              request.status === "done"
                ? "bg-accent-emerald/20 text-accent-emerald"
                : request.status === "accepted"
                  ? "bg-accent-cyan/15 text-accent-cyan"
                  : "bg-muted text-muted-foreground"
            )}>
              {request.status === "done" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                request.customerName.charAt(0).toUpperCase()
              )}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{request.customerName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{request.businessName} · {request.requestedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold",
              request.status === "done"
                ? "bg-accent-emerald/15 text-accent-emerald"
                : request.status === "accepted"
                  ? "bg-accent-cyan/15 text-accent-cyan"
                  : "bg-amber-400/15 text-amber-500"
            )}>
              {request.status === "done" ? "เสร็จแล้ว" : request.status === "accepted" ? "รับงาน" : "รอรับ"}
            </span>
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              expanded && "rotate-180"
            )} />
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3">
              {/* Contact info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{request.customerName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <a href={`tel:${request.customerPhone}`} className="text-accent-cyan hover:underline">
                    {request.customerPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{request.businessAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>เวลาที่ต้องการ: <span className="font-medium text-foreground">{request.requestedTime}</span></span>
                </div>
              </div>

              {/* Actions */}
              {request.status === "pending" && (
                <button
                  type="button"
                  onClick={() => { onAccept(request.id); setExpanded(true); }}
                  className="w-full rounded-xl bg-gradient-brand py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  รับงาน — ไปกดบัตร
                </button>
              )}

              {request.status === "accepted" && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">กรอกเลขคิวที่ได้</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ticketInput}
                      onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
                      placeholder="เช่น A-088"
                      className="flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-accent-cyan/50"
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!ticketInput.trim()}
                      className="rounded-xl bg-accent-emerald/15 px-4 py-2 text-sm font-semibold text-accent-emerald hover:bg-accent-emerald/25 transition-colors disabled:opacity-40"
                    >
                      ส่ง
                    </button>
                  </div>
                </div>
              )}

              {request.status === "done" && request.queueNumber && (
                <div className="flex items-center justify-between rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 px-4 py-3">
                  <span className="text-xs text-accent-emerald/70">เลขคิวที่ส่งให้ลูกค้า</span>
                  <span className="text-lg font-bold font-mono text-accent-emerald">{request.queueNumber}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
