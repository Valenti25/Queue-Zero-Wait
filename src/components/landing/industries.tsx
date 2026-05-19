"use client";

import {
  Building2,
  Car,
  Check,
  Dumbbell,
  Landmark,
  Layers,
  Scissors,
  Stethoscope,
  Ticket,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Section } from "@/components/shared/section";
import { useT } from "@/components/providers/locale-provider";
import {
  marketingBodyClass,
  marketingEyebrowClass,
  marketingTitleClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [
  Stethoscope,
  Scissors,
  Landmark,
  Dumbbell,
  UtensilsCrossed,
  Car,
  Ticket,
  Building2,
];

const accentStyles = [
  "text-accent-cyan bg-accent-cyan/10",
  "text-accent-violet bg-accent-violet/10",
  "text-accent-emerald bg-accent-emerald/10",
  "text-accent-amber bg-accent-amber/10",
  "text-accent-rose bg-accent-rose/10",
  "text-brand-500 bg-brand-500/10",
  "text-accent-cyan bg-accent-cyan/10",
  "text-accent-violet bg-accent-violet/10",
];

export function Industries() {
  const t = useT();

  return (
    <Section id="industries" className="relative overflow-hidden py-14 md:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-accent-cyan/5 blur-3xl"
        aria-hidden
      />

      <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <FadeIn className="lg:sticky lg:top-24">
          <p className={marketingEyebrowClass}>{t.industries.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{t.industries.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{t.industries.description}</p>

          <div className="mt-7 rounded-2xl border border-border/50 bg-card/35 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet">
                <Layers className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">
                  {t.industries.notOnlyTitle}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t.industries.notOnlyDescription}
                </p>
              </div>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {t.industries.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-500"
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-5 space-y-2.5">
            {t.industries.highlights.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <span className="leading-snug">{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">{t.industries.footnote}</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.industries.items.map((industry, i) => {
              const Icon = icons[i] ?? Building2;
              const accent = accentStyles[i % accentStyles.length];

              return (
                <li
                  key={industry.label}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/40 p-4 transition-colors duration-300 hover:border-border hover:bg-card/65"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        accent
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
                        {industry.label}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {industry.description}
                      </p>
                      {industry.tags?.length ? (
                        <ul className="mt-2.5 flex flex-wrap gap-1">
                          {industry.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}



