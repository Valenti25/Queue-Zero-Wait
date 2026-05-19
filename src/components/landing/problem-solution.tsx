"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Frown,
  LayoutDashboard,
  MapPinned,
  MonitorSmartphone,
  Smartphone,
  X,
  Zap,
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

const problemIcons = [Clock, Smartphone, Frown];
const solutionIcons = [Zap, Smartphone, Clock];
const ROW_COUNT = 3;
const CYCLE_MS = 3600;
const highlightIcons = [MapPinned, MonitorSmartphone, LayoutDashboard] as const;
const INDUSTRY_CHIP_COUNT = 5;

export function ProblemSolution() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % ROW_COUNT);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused]);

  return (
    <Section className="bg-muted/20 py-14 md:py-20">
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12">
        <FadeIn className="max-w-lg lg:pt-2">
          <p className={marketingEyebrowClass}>{t.problem.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{t.problem.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{t.problem.description}</p>

          <div className="mt-6">
            <p className="text-xs font-medium text-muted-foreground">{t.problem.fitLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {t.industries.items.slice(0, INDUSTRY_CHIP_COUNT).map((item) => (
                <li
                  key={item.label}
                  className="rounded-md border border-border/50 bg-background/50 px-2.5 py-1 text-xs font-medium text-foreground/90"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-5 space-y-2.5 rounded-xl border border-border/50 bg-card/40 p-4">
            {t.problem.highlights.map((text, i) => {
              const Icon = highlightIcons[i] ?? MapPinned;
              return (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-snug text-foreground/90">{text}</span>
                </li>
              );
            })}
          </ul>

        </FadeIn>

        <FadeIn delay={0.05}>
          <ComparisonDeck
            activeIdx={activeIdx}
            paused={paused}
            onPauseChange={setPaused}
            withoutLabel={t.problem.without}
            withLabel={t.problem.with}
            problems={t.problem.problems}
            solutions={t.problem.solutions}
            animate={!prefersReducedMotion}
          />
        </FadeIn>
      </div>
    </Section>
  );
}

function ComparisonDeck({
  activeIdx,
  paused,
  onPauseChange,
  withoutLabel,
  withLabel,
  problems,
  solutions,
  animate,
}: {
  activeIdx: number;
  paused: boolean;
  onPauseChange: (paused: boolean) => void;
  withoutLabel: string;
  withLabel: string;
  problems: ReadonlyArray<{ readonly title: string; readonly desc: string }>;
  solutions: ReadonlyArray<{ readonly title: string; readonly desc: string }>;
  animate: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-card/60"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
    >
      <div className="grid grid-cols-2">
        <DeckHeader label={withoutLabel} tone="problem" />
        <DeckHeader label={withLabel} tone="solution" />
      </div>

      <ul className="divide-y divide-border/30 p-3">
        {problems.map((problem, i) => {
          const solution = solutions[i]!;
          const active = i === activeIdx;
          return (
            <li key={problem.title} className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 py-0.5">
              <DeckCell
                icon={problemIcons[i]!}
                title={problem.title}
                desc={problem.desc}
                tone="problem"
                active={active}
                index={i}
              />
              <div className="flex w-9 shrink-0 items-center justify-center">
                {active && animate ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/80"
                  >
                    <motion.span
                      animate={paused ? {} : { x: [0, 2, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-accent-cyan" />
                    </motion.span>
                  </motion.span>
                ) : (
                  <span className="h-px w-3 bg-border/60" aria-hidden />
                )}
              </div>
              <DeckCell
                icon={solutionIcons[i]!}
                title={solution.title}
                desc={solution.desc}
                tone="solution"
                active={active}
                index={i}
                alignEnd
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DeckHeader({ label, tone }: { label: string; tone: "problem" | "solution" }) {
  const isSolution = tone === "solution";
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-3",
        isSolution
          ? "bg-accent-cyan/[0.07] text-accent-cyan"
          : "bg-accent-rose/[0.06] text-accent-rose"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isSolution ? "bg-accent-cyan/15" : "bg-accent-rose/10"
        )}
      >
        {isSolution ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      </span>
      <span className="text-sm font-semibold leading-tight">{label}</span>
    </div>
  );
}

function DeckCell({
  icon: Icon,
  title,
  desc,
  tone,
  active,
  index,
  alignEnd,
}: {
  icon: typeof Clock;
  title: string;
  desc: string;
  tone: "problem" | "solution";
  active: boolean;
  index: number;
  alignEnd?: boolean;
}) {
  const isSolution = tone === "solution";

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg px-3 py-3 transition-colors duration-300",
        alignEnd && "flex-row-reverse text-right",
        active
          ? isSolution
            ? "bg-accent-cyan/[0.08]"
            : "bg-accent-rose/[0.06]"
          : "bg-transparent"
      )}
    >
      <span
        className={cn(
          "font-display text-xl font-bold tabular-nums leading-none",
          isSolution ? "text-accent-cyan/25" : "text-accent-rose/25"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          isSolution ? "bg-accent-cyan/15 text-accent-cyan" : "bg-accent-rose/10 text-accent-rose"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
