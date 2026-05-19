"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  MapPinned,
  Radio,
  Smartphone,
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

const stepIcons = [MapPinned, Smartphone, Radio, ClipboardList];
const CYCLE_MS = 4000;

function segmentProgress(
  segmentIndex: number,
  progress: number,
  activeIdx: number,
  reducedMotion: boolean
) {
  if (reducedMotion) return activeIdx > segmentIndex ? 1 : 0;
  return Math.min(Math.max(progress - segmentIndex, 0), 1);
}

export function HowItWorks() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const steps = t.howItWorks.steps;
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const animStartRef = useRef(performance.now());

  const goToStep = (index: number) => {
    animStartRef.current = performance.now() - index * CYCLE_MS;
    setProgress(index);
    setActiveIdx(index);
  };

  useEffect(() => {
    if (prefersReducedMotion || paused || steps.length === 0) return;
    const totalMs = steps.length * CYCLE_MS;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = (now - animStartRef.current) % totalMs;
      const value = elapsed / CYCLE_MS;
      setProgress(value);
      setActiveIdx(Math.min(Math.floor(value), steps.length - 1));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, prefersReducedMotion, steps.length]);

  useEffect(() => {
    if (!prefersReducedMotion || paused || steps.length === 0) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % steps.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion, paused, steps.length]);

  useEffect(() => {
    const el = cardRefs.current[activeIdx];
    const container = scrollRef.current;
    if (!el || !container) return;
    const elLeft = el.offsetLeft;
    const elWidth = el.offsetWidth;
    const containerWidth = container.clientWidth;
    const target = elLeft - (containerWidth - elWidth) / 2;
    container.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIdx, prefersReducedMotion]);

  return (
    <Section id="how-it-works" className="bg-muted/20 py-14 md:py-20">
      <motion.div
        className="flex flex-col gap-10 md:gap-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className={marketingEyebrowClass}>{t.howItWorks.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{t.howItWorks.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{t.howItWorks.description}</p>
          <p className="mt-5 inline-flex rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500">
            {steps.length} {t.howItWorks.stepCountLabel}
          </p>
        </FadeIn>

        <FadeIn delay={0.05} className="w-full">
          <ol className="flex w-full items-start">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] ?? MapPinned;
              const active = index === activeIdx;
              const reached = index <= activeIdx;
              const fill =
                index === 0
                  ? null
                  : segmentProgress(
                      index - 1,
                      progress,
                      activeIdx,
                      !!prefersReducedMotion
                    );

              return (
                <Fragment key={step.title}>
                  {fill !== null && (
                    <li
                      className="flex min-w-0 flex-1 list-none items-center self-start pt-5"
                      aria-hidden
                    >
                      <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-border/50">
                        <div
                          className="h-full origin-left rounded-full bg-accent-cyan"
                          style={{ transform: `scaleX(${fill})` }}
                        />
                      </div>
                    </li>
                  )}
                  <li className="flex shrink-0 list-none flex-col items-center">
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      className="group flex flex-col items-center"
                      aria-current={active ? "step" : undefined}
                    >
                      <motion.div
                        className={cn(
                          "relative flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
                          active
                            ? "border-accent-cyan text-accent-cyan"
                            : reached
                              ? "border-accent-cyan/50 text-accent-cyan/80"
                              : "border-border/60 text-muted-foreground group-hover:border-border"
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
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <span
                        className={cn(
                          "mt-2 font-display text-xs font-bold tabular-nums",
                          active ? "text-accent-cyan" : "text-muted-foreground/50"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "mt-1 hidden max-w-[9.5rem] px-1 text-center text-xs font-semibold leading-snug sm:block lg:max-w-[11rem]",
                          active ? "text-foreground" : "text-muted-foreground/70"
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <div
            ref={scrollRef}
            className="-mx-4 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <ol className="flex min-w-min gap-3 lg:grid lg:w-full lg:min-w-0 lg:grid-cols-4 lg:gap-5">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] ?? MapPinned;
                const active = index === activeIdx;

                return (
                  <li
                    key={step.title}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className="w-[min(100%,20rem)] shrink-0 sm:w-[calc(50%-0.375rem)] lg:min-w-0 lg:w-auto"
                  >
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      className={cn(
                        "flex h-full w-full flex-col rounded-xl px-4 py-4 text-left transition-colors duration-300",
                        active ? "bg-accent-cyan/8" : "bg-card/60 hover:bg-card"
                      )}
                    >
                      <motion.div
                        className={cn(
                          "mb-3 flex h-9 w-9 items-center justify-center rounded-full sm:hidden",
                          active
                            ? "bg-accent-cyan/15 text-accent-cyan"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <h3
                        className={cn(
                          "text-sm font-semibold leading-snug",
                          active ? "text-foreground" : "text-foreground/90"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </FadeIn>
      </motion.div>
    </Section>
  );
}
