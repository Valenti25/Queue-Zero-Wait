"use client";

import {
  ArrowRight,
  BarChart3,
  Heart,
  MapPinned,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Section } from "@/components/shared/section";
import { MerchantDashboardPreview } from "@/components/landing/merchant-dashboard-preview";
import { ButtonLink } from "@/components/ui/button-link";
import { useT } from "@/components/providers/locale-provider";
import {
  marketingBodyClass,
  marketingEyebrowClass,
  marketingSubheadClass,
  marketingTitleClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

const pillarIcons: LucideIcon[] = [Heart, MapPinned, TrendingUp, BarChart3];

export function MerchantValue() {
  const t = useT();
  const m = t.merchantValue;

  return (
    <Section id="for-owners" className="bg-muted/20 py-14 md:py-20">
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 xl:gap-10">
        <FadeIn className="flex min-w-0 flex-col justify-center lg:min-h-[30rem]">
          <p className={marketingEyebrowClass}>{m.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{m.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{m.description}</p>

          <blockquote
            className={cn(
              "mt-5 border-l-2 border-brand-500/50 pl-3.5",
              marketingSubheadClass
            )}
          >
            {m.thesis}
          </blockquote>

          <ul className="mt-5 space-y-3">
            {m.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? Store;
              return (
                <li key={pillar.title} className="flex gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                    <Icon className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{pillar.title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      {pillar.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <ButtonLink
              href="/signup"
              className="h-8 rounded-full border-0 bg-gradient-brand px-3.5 text-xs text-primary-foreground hover:opacity-90 sm:px-4"
            >
              {m.cta}
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </ButtonLink>
            <ButtonLink
              href="/dashboard"
              variant="outline"
              className="h-8 rounded-full px-3.5 text-xs sm:px-4"
            >
              {m.ctaDashboard}
            </ButtonLink>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.08}
          className="flex min-w-0 flex-col lg:min-h-[30rem] lg:justify-center"
        >
          <MerchantDashboardPreview />
        </FadeIn>
      </div>
    </Section>
  );
}
