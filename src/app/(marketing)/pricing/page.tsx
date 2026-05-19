"use client";

import { CTA } from "@/components/landing/cta";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQ } from "@/components/landing/faq";
import { useT } from "@/components/providers/locale-provider";
import { marketingBodyClass, marketingTitleClass, siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const t = useT();

  return (
    <div className="pt-8">
      <div className={cn(siteContainerClass, "text-center")}>
        <div className="mx-auto max-w-3xl">
          <h1 className={marketingTitleClass}>{t.pricing.pageTitle}</h1>
          <p className={cn("mt-3", marketingBodyClass)}>{t.pricing.pageDescription}</p>
        </div>
      </div>
      <PricingSection />
      <FAQ />
      <CTA />
    </div>
  );
}
