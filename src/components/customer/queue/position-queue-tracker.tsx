"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, Clock, Users } from "lucide-react";
import { useQueueSimulation } from "@/hooks/use-queue-simulation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { DEMO_WAITLIST } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function PositionQueueTracker({
  business,
  ticketId,
  showLiveQueue = false,
}: {
  business: CustomerBusiness;
  ticketId: string;
  showLiveQueue?: boolean;
}) {
  const t = useT();
  const queue = useQueueSimulation();
  const progress = Math.min(100, ((12 - queue.totalAhead) / 12) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="mb-4 gap-1.5 border-accent-emerald/30 bg-accent-emerald/15 text-accent-emerald">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.queue.liveUpdates}
        </Badge>
        <h1 className="font-display text-2xl font-semibold">{business.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.queue.ticket} {ticketId.slice(0, 12)}
        </p>
      </div>

      <Card className="overflow-hidden border-border/60 bg-card/80 glow-card">
        <CardHeader className="pb-2 text-center">
          <AnimatePresence mode="wait">
            {queue.status === "called" ? (
              <motion.div
                key="called"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-2"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <CardTitle className="text-2xl text-accent-emerald">{t.queue.youreUp}</CardTitle>
                <CardDescription>{t.queue.proceedNow}</CardDescription>
              </motion.div>
            ) : (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="mb-2 text-sm text-muted-foreground">{t.queue.yourPosition}</p>
                <CardTitle className="text-6xl font-bold tabular-nums text-gradient">
                  #{queue.position}
                </CardTitle>
              </motion.div>
            )}
          </AnimatePresence>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Users} label={t.queue.peopleAhead} value={String(queue.totalAhead)} />
            <StatCard icon={Clock} label={t.queue.estWait} value={`~${queue.estimatedWaitMinutes}m`} />
          </div>
          {showLiveQueue && (
            <ul className="space-y-1.5">
              {DEMO_WAITLIST.slice(0, 4).map((entry) => {
                const isYou = entry.customerName === "You";
                return (
                  <li
                    key={entry.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                      isYou ? "border-accent-cyan/40 bg-accent-cyan/10" : "border-border/50"
                    )}
                  >
                    <span className={cn("font-medium", isYou && "text-accent-cyan")}>
                      {entry.customerName}
                    </span>
                    <span className="tabular-nums text-muted-foreground">~{entry.waitMinutes}m</span>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="text-center text-xs text-muted-foreground">
            {t.queue.lastUpdated} {queue.lastUpdate.toLocaleTimeString()}
          </p>
          {queue.status === "called" && (
            <Button className="w-full border-0 bg-accent-emerald text-primary-foreground hover:opacity-90">
              {t.queue.imHere}
            </Button>
          )}
          <Button variant="outline" className="w-full gap-2" disabled>
            <Bell className="h-4 w-4" />
            {t.queue.notificationsOn}
          </Button>
        </CardContent>
      </Card>

      <OptionalActionsPanel />
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="text-brand-600 hover:underline">
          {t.common.poweredBy}
        </Link>
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
      <Icon className="mx-auto mb-2 h-5 w-5 text-brand-600" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
