"use client";

import Link from "next/link";
import { Calendar, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import { FITNESS_CLASSES, type CustomerBusiness } from "@/lib/customer/businesses";
import { useT } from "@/components/providers/locale-provider";

export function ClassQueueTracker({
  business,
  ticketId,
  classId = "yoga",
}: {
  business: CustomerBusiness;
  ticketId: string;
  classId?: string;
}) {
  const t = useT();
  const fitnessClass = FITNESS_CLASSES.find((c) => c.id === classId) ?? FITNESS_CLASSES[0]!;
  const fill = Math.round(
    ((fitnessClass.spotsTotal - fitnessClass.spotsLeft) / fitnessClass.spotsTotal) * 100
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className="mb-3 border-accent-amber/30 bg-accent-amber/15 text-accent-amber">
          {t.booking.confirmed}
        </Badge>
        <h1 className="font-display text-2xl font-semibold">{business.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.queue.ticket} {ticketId.slice(0, 10)}
        </p>
      </div>

      <Card className="border-border/60 bg-card/80 glow-card">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/60 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-amber/10 text-accent-amber">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="font-semibold">{fitnessClass.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {fitnessClass.time} · {fitnessClass.instructor}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 px-4 py-3 text-center">
            <p className="text-xs text-muted-foreground">{t.customerFlow.spotsLeft}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {fitnessClass.spotsLeft} / {fitnessClass.spotsTotal}
            </p>
          </div>

          <div className="space-y-1">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent-amber" style={{ width: `${fill}%` }} />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {t.customerFlow.checkInReminder}
            </p>
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
