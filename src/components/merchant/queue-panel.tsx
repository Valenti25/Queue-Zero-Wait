"use client";

import { useState } from "react";
import { Phone, UserX } from "lucide-react";
import { DEMO_WAITLIST } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WaitlistEntry } from "@/types";
import { useT } from "@/components/providers/locale-provider";

export function QueuePanel() {
  const t = useT();
  const [entries, setEntries] = useState<WaitlistEntry[]>(DEMO_WAITLIST);

  function callNext() {
    setEntries((prev) => {
      const next = prev.find((e) => e.status === "waiting");
      if (!next) return prev;
      return prev.map((e) =>
        e.id === next.id ? { ...e, status: "called" as const } : e
      );
    });
  }

  function markNoShow(id: string) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "no_show" as const } : e))
    );
  }

  return (
    <Card id="waitlist" className="border-border/60 bg-card/50 glow-card">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="font-display">{t.merchant.liveWaitlist}</CardTitle>
          <CardDescription>{t.merchant.liveWaitlistDesc}</CardDescription>
        </div>
        <Button
          className="bg-gradient-brand text-primary-foreground border-0 shrink-0"
          onClick={callNext}
        >
          <Phone className="mr-2 h-4 w-4" />
          {t.merchant.callNext}
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                {entry.position}
              </span>
              <div>
                <p className="font-medium">{entry.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.merchant.partyOf} {entry.partySize} · ~{entry.waitMinutes}m · {entry.joinedAt}
                      </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={entry.status === "called" ? "default" : "secondary"}
                className={
                  entry.status === "called" ? "bg-brand-600 text-white" : undefined
                }
              >
                {entry.status.replace("_", " ")}
              </Badge>
              {entry.status === "waiting" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => markNoShow(entry.id)}
                  aria-label="Mark no-show"
                >
                  <UserX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
