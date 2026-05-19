"use client";

import { MapPin, Store } from "lucide-react";
import { useLocale, useT } from "@/components/providers/locale-provider";
import { MERCHANT_METRICS } from "@/lib/merchant-analytics";
import { DEMO_BUSINESS } from "@/lib/mock-data";

const industryLabels: Record<string, { th: string; en: string }> = {
  restaurant: { th: "ร้านอาหาร", en: "Restaurant" },
  clinic: { th: "คลินิก", en: "Clinic" },
  salon: { th: "ร้านเสริมสวย", en: "Salon" },
};

export function MerchantStoreBanner() {
  const t = useT();
  const { locale } = useLocale();
  const industry =
    industryLabels[DEMO_BUSINESS.industry]?.[locale] ?? DEMO_BUSINESS.industry;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-border/60 bg-card/50 p-4 sm:p-5">
      <div className="flex gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-br text-primary-foreground">
          <Store className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {DEMO_BUSINESS.name}
          </h1>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>
              {industry} · {DEMO_BUSINESS.address}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{t.merchant.greetingDesc}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-muted-foreground">
          {t.merchant.ai.statBookings}:{" "}
          <strong className="text-foreground">{MERCHANT_METRICS.totalBookings}</strong>
        </span>
        <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-muted-foreground">
          {t.merchant.ai.statWaitlist}:{" "}
          <strong className="text-foreground">{MERCHANT_METRICS.totalWaitlistJoins}</strong>
        </span>
        <span className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-1 text-brand-500">
          {t.merchant.growthTrial}
        </span>
      </div>
    </div>
  );
}
