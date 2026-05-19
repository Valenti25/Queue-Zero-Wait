"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Calendar,
  Check,
  ClipboardList,
  LayoutDashboard,
  MapPinned,
  Radio,
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

const icons = [MapPinned, Radio, Calendar, Bell, ClipboardList, LayoutDashboard];
const accentColors = [
  "text-accent-cyan bg-accent-cyan/10",
  "text-accent-violet bg-accent-violet/10",
  "text-accent-emerald bg-accent-emerald/10",
  "text-accent-amber bg-accent-amber/10",
  "text-accent-rose bg-accent-rose/10",
  "text-brand-500 bg-brand-500/10",
];

const CYCLE_MS = 3800;

export function Features() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const items = t.features.items;
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length === 0) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % items.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, items.length]);

  return (
    <Section id="features" className="py-14 md:py-20">
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12">
        <FadeIn className="max-w-lg lg:sticky lg:top-24">
          <p className={marketingEyebrowClass}>{t.features.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{t.features.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{t.features.description}</p>

          <div className="mt-6">
            <p className="text-xs font-medium text-muted-foreground">{t.features.outcomesLabel}</p>
            <ul className="mt-2.5 space-y-2">
              {t.features.outcomes.map((text) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                  <span className="leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium text-muted-foreground">{t.features.includesLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {t.features.includes.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-500"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

        </FadeIn>

        <FadeIn delay={0.05}>
          <ul
            className="space-y-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((feature, i) => {
              const Icon = icons[i]!;
              const active = i === activeIdx;
              return (
                <li key={feature.title}>
                  <button
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      "flex w-full gap-4 rounded-xl px-4 py-3.5 text-left transition-colors duration-300",
                      active ? "bg-accent-cyan/[0.08]" : "bg-card/50 hover:bg-card/70"
                    )}
                  >
                    <motion.div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        accentColors[i]
                      )}
                      animate={
                        !prefersReducedMotion && active && !paused
                          ? { scale: [1, 1.06, 1] }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: 1.4,
                        repeat: active && !paused ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={cn(
                          "text-xs font-medium leading-snug",
                          active ? "text-foreground" : "text-foreground/90"
                        )}
                      >
                        {feature.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}
