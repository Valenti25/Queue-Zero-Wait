"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useQueueSimulation } from "@/hooks/use-queue-simulation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import { CLINIC_TRIAGE_STAGES, type CustomerBusiness } from "@/lib/customer/businesses";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function TriageQueueTracker({
  business,
  ticketId,
}: {
  business: CustomerBusiness;
  ticketId: string;
}) {
  const t = useT();
  const queue = useQueueSimulation();
  const activeStage = 1;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="mb-3 border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
          {t.queue.liveUpdates}
        </Badge>
        <h1 className="font-display text-2xl font-semibold">{business.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.queue.ticket} B-14 · {ticketId.slice(0, 8)}
        </p>
      </div>

      <Card className="border-border/60 bg-card/80 glow-card">
        <CardContent className="space-y-4 p-5">
          <ol className="flex items-center justify-between gap-1">
            {CLINIC_TRIAGE_STAGES.map((label, i) => {
              const done = i < activeStage;
              const current = i === activeStage;
              return (
                <li key={label} className="flex flex-1 flex-col items-center gap-1">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                      done && "bg-accent-emerald/15 text-accent-emerald",
                      current && "bg-accent-cyan/15 text-accent-cyan ring-2 ring-accent-cyan/30",
                      !done && !current && "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="text-center text-[10px] leading-tight text-muted-foreground">
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="rounded-lg bg-muted/30 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">{t.queue.yourPosition}</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-gradient">B-14</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/50 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">{t.queue.peopleAhead}</p>
              <p className="text-lg font-semibold tabular-nums">{queue.totalAhead}</p>
            </div>
            <div className="rounded-lg border border-border/50 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">{t.queue.estWait}</p>
              <p className="text-lg font-semibold tabular-nums">~{queue.estimatedWaitMinutes}m</p>
            </div>
          </div>
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
