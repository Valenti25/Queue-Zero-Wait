"use client";

import { ExternalLink, Lock, MapPinned, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/components/providers/locale-provider";
import { usePrimaryOwnerRestaurant } from "@/hooks/use-primary-owner-restaurant";
import { getRestaurantStorefrontUrl } from "@/lib/restaurant/utils";

export function GoogleConnect() {
  const t = useT();
  const { restaurant } = usePrimaryOwnerRestaurant();

  const isQueueAgent = restaurant?.businessType === "queue-agent";
  const slug = restaurant?.slug ?? "";
  const bookingUrl = slug
    ? getRestaurantStorefrontUrl(slug, "live").replace("/r/", "/book/")
    : "";
  const waitlistUrl = bookingUrl ? `${bookingUrl}?mode=waitlist` : "";

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
        {isQueueAgent ? (
          /* ตี๋น้อย / queue-agent — Exclusive, ไม่มี Google link */
          <div className="space-y-3">
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-brand-500 fill-current" />
                <p className="text-sm font-semibold text-brand-500">Exclusive on QueueZeroWait</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {restaurant?.name} — จองได้ที่นี่ที่เดียว ไม่มีลิงก์ Google
              </p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-muted/20 p-3.5">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                บริการนี้ Exclusive อยู่ในแอปเท่านั้น — ไม่แสดงบน Google Search เพื่อรักษา
                ความพิเศษและสร้าง viral ผ่านโซเชียลมีเดีย
              </p>
            </div>
          </div>
        ) : (
          /* Restaurant / Salon — แสดง Google link ปกติ */
          <>
            <div className="rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 p-4">
              <p className="text-sm font-medium text-accent-emerald">{t.merchant.connected}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {restaurant?.name ?? "ร้านของคุณ"}
              </p>
            </div>
            <div className="space-y-2">
              <Label>{t.merchant.reserveLink}</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={bookingUrl || "กรุณาสร้างร้านก่อน"}
                  className="font-mono text-xs"
                />
                {bookingUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open"
                    onClick={() => window.open(bookingUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t.merchant.waitlistLink}</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={waitlistUrl || "กรุณาสร้างร้านก่อน"}
                  className="font-mono text-xs"
                />
                {waitlistUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open"
                    onClick={() => window.open(waitlistUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
