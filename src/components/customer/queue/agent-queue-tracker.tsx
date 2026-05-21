"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { SocialShare } from "@/components/customer/shared/social-share";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import type { AgentStatus } from "@/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const STATUS_LABELS: Record<AgentStatus, { th: string; desc: string }> = {
  pending_agent: {
    th: "รอ agent รับงาน",
    desc: "กำลังหา agent ที่ว่างในพื้นที่คลอง 6",
  },
  agent_dispatched: {
    th: "กำลังเดินทางไปกดบัตร",
    desc: "agent ของเรากำลังเดินทางไปที่ร้านตี๋น้อยให้คุณ",
  },
  ticket_received: {
    th: "ได้เลขคิวแล้ว!",
    desc: "คุณสามารถไปที่ร้านและรอเรียกคิวได้เลย",
  },
};

const STATUS_ORDER: AgentStatus[] = ["pending_agent", "agent_dispatched", "ticket_received"];

export function AgentQueueTracker({
  business,
  ticketId,
}: {
  business: CustomerBusiness;
  ticketId: string;
}) {
  const [status, setStatus] = useState<AgentStatus>("pending_agent");
  const [queueNumber, setQueueNumber] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  /* Demo simulation — auto-advance through statuses */
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("agent_dispatched"), 4000),
      setTimeout(() => {
        setStatus("ticket_received");
        setQueueNumber("A-088");
      }, 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const currentStepIdx = STATUS_ORDER.indexOf(status);
  const isComplete = status === "ticket_received";

  return (
    <div className="min-h-screen bg-background">
      <BusinessHeader business={business} />

      <div className="mx-auto max-w-sm px-4 py-6 space-y-5">
        {/* Status header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className={cn(
              "rounded-2xl p-5 text-center border",
              isComplete
                ? "border-accent-emerald/30 bg-accent-emerald/5"
                : "border-accent-cyan/20 bg-accent-cyan/5"
            )}
          >
            <div className="flex justify-center mb-3">
              {isComplete ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-emerald/10">
                  <CheckCircle2 className="h-7 w-7 text-accent-emerald" />
                </span>
              ) : (
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan/20" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent-cyan/10">
                    <Navigation className="h-6 w-6 text-accent-cyan" />
                  </span>
                </span>
              )}
            </div>

            <p className={cn(
              "text-base font-bold",
              isComplete ? "text-accent-emerald" : "text-foreground"
            )}>
              {STATUS_LABELS[status].th}
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {STATUS_LABELS[status].desc}
            </p>

            {/* Queue number */}
            {queueNumber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="mt-4 inline-flex flex-col items-center rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 px-6 py-3"
              >
                <p className="text-[11px] font-medium text-accent-emerald/70 uppercase tracking-wide">
                  เลขคิวของคุณ
                </p>
                <p className="text-3xl font-bold tabular-nums text-accent-emerald mt-0.5">
                  {queueNumber}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress steps */}
        <div className="rounded-xl border border-border/50 bg-card/40 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-3">ความคืบหน้า</p>
          <ol className="space-y-3">
            {STATUS_ORDER.map((s, i) => {
              const done = i < currentStepIdx;
              const active = i === currentStepIdx;
              return (
                <li key={s} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                      done && "bg-accent-emerald text-white",
                      active && "bg-accent-cyan/20 text-accent-cyan ring-1 ring-accent-cyan/40",
                      !done && !active && "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className={cn(
                      "text-xs font-medium",
                      active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/60"
                    )}>
                      {STATUS_LABELS[s].th}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-border/40 bg-card/40 p-3 text-center">
            <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-[10px] text-muted-foreground">เวลาที่รอ</p>
            <p className="text-sm font-bold tabular-nums text-foreground">
              {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
              {String(elapsed % 60).padStart(2, "0")}
            </p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card/40 p-3 text-center">
            <MapPin className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-[10px] text-muted-foreground">ร้าน</p>
            <p className="text-sm font-bold text-foreground">คลอง 6</p>
          </div>
        </div>

        {/* Help */}
        <div className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-card/40 px-4 py-3">
          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            มีปัญหา?{" "}
            <a href="tel:+66800000000" className="font-medium text-accent-cyan hover:underline">
              ติดต่อทีมเรา
            </a>
          </p>
        </div>

        {/* Social share — always visible */}
        <SocialShare businessName="ตี๋น้อย คลอง 6" bookingSlug={business.slug} />
      </div>
    </div>
  );
}
