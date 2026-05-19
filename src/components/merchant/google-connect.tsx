"use client";

import { ExternalLink, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/components/providers/locale-provider";

export function GoogleConnect() {
  const t = useT();

  return (
    <Card id="google" className="border-border/60 bg-card/50 glow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <MapPinned className="h-5 w-5 text-accent-cyan" />
          {t.merchant.googleTitle}
        </CardTitle>
        <CardDescription>{t.merchant.googleDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 p-4">
          <p className="text-sm font-medium text-accent-emerald">{t.merchant.connected}</p>
          <p className="text-xs text-muted-foreground mt-1">Harbor Bistro · San Francisco</p>
        </div>
        <div className="space-y-2">
          <Label>{t.merchant.reserveLink}</Label>
          <div className="flex gap-2">
            <Input
              readOnly
              value="https://queuezerowait.com/book/harbor-bistro"
              className="font-mono text-xs"
            />
            <Button variant="outline" size="icon" aria-label="Open">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t.merchant.waitlistLink}</Label>
          <div className="flex gap-2">
            <Input
              readOnly
              value="https://queuezerowait.com/book/harbor-bistro?mode=waitlist"
              className="font-mono text-xs"
            />
            <Button variant="outline" size="icon" aria-label="Open">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
