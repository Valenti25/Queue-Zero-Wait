"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function TicketQueueTracker({
  business,
  ticketId,
  ticketNumber = "A-042",
  service = "New account · ID verification",
  counter = "3",
}: {
  business: CustomerBusiness;
  ticketId: string;
  ticketNumber?: string;
  service?: string;
  counter?: string;
}) {
  const t = useT();
  const [called, setCalled] = useState(ticketId.includes("called"));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="mb-3 border-accent-emerald/30 bg-accent-emerald/15 text-accent-emerald">
          {t.queue.liveUpdates}
        </Badge>
        <h1 className="font-display text-2xl font-semibold">{business.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{business.address}</p>
      </div>

      <Card className="border-border/60 bg-card/80 glow-card">
        <CardContent className="p-5">
          <div
            className={cn(
              "rounded-xl border px-4 py-6 text-center transition-colors",
              called
                ? "border-accent-emerald/40 bg-accent-emerald/10"
                : "border-border/50 bg-muted/30"
            )}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.customerFlow.ticketLabel}
            </p>
            <p className="mt-2 font-display text-5xl font-bold tabular-nums tracking-tight text-gradient">
              {ticketNumber}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{service}</p>
            <p className="mt-3 min-h-[2.5rem] text-sm font-medium">
              {called
                ? t.customerFlow.proceedCounter.replace("{counter}", counter)
                : t.queue.estWait + " ~22m"}
            </p>
          </div>

          {!called && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border border-border/50 px-3 py-2">
                <p className="text-[10px] text-muted-foreground">{t.queue.peopleAhead}</p>
                <p className="text-lg font-semibold">4</p>
              </div>
              <div className="rounded-lg border border-border/50 px-3 py-2">
                <p className="text-[10px] text-muted-foreground">{t.queue.estWait}</p>
                <p className="text-lg font-semibold">~22m</p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="mt-4 w-full text-center text-xs text-muted-foreground underline"
            onClick={() => setCalled((c) => !c)}
          >
            {called ? "Demo: waiting" : "Demo: called to counter"}
          </button>
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
