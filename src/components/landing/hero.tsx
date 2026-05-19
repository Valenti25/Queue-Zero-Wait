"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Landmark,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useT } from "@/components/providers/locale-provider";
import { DEMO_OPTIONAL_ACTIONS, DEMO_TIME_SLOTS, DEMO_WAITLIST } from "@/lib/mock-data";
import { marketingTitleClass, siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type DemoMode = "booking" | "waitlist" | "actions";

const industryIcons: LucideIcon[] = [
  Stethoscope,
  Scissors,
  Landmark,
  Dumbbell,
  UtensilsCrossed,
];

const demoQueueByIndustry = [
  { position: 12, ahead: 3, wait: 12 },
  { position: 8, ahead: 2, wait: 18 },
  { position: 5, ahead: 1, wait: 25 },
  { position: 15, ahead: 4, wait: 35 },
  { position: 6, ahead: 2, wait: 40 },
];

const featureIcons = [Zap, Clock, CheckCircle2] as const;
const demoModes: DemoMode[] = ["waitlist", "booking", "actions"];

const DEMO_PANEL_MIN_H = "min-h-[18rem]";
const DEMO_PANEL_MAX_H = "max-h-[18rem]";

/** Scroll only the tab strip — never the document (scrollIntoView pulls the page to hero). */
function scrollTabWithinContainer(container: HTMLElement, tab: HTMLElement) {
  const tabLeft = tab.offsetLeft;
  const tabWidth = tab.offsetWidth;
  const viewWidth = container.clientWidth;
  const maxScroll = container.scrollWidth - viewWidth;
  const target = tabLeft - (viewWidth - tabWidth) / 2;
  const next = Math.max(0, Math.min(target, maxScroll));

  if (Math.abs(container.scrollLeft - next) > 2) {
    container.scrollTo({ left: next, behavior: "smooth" });
  }
}

export function Hero() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const industries = t.industries.items.slice(0, industryIcons.length);
  const [mode, setMode] = useState<DemoMode>("waitlist");
  const [industryIdx, setIndustryIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [simQueue, setSimQueue] = useState(demoQueueByIndustry[0]);
  const [bookingSlotIdx, setBookingSlotIdx] = useState(0);
  const [actionIdx, setActionIdx] = useState(0);

  const industry = industries[industryIdx];

  const resetSimQueue = useCallback((idx: number) => {
    setSimQueue(demoQueueByIndustry[idx] ?? demoQueueByIndustry[0]);
  }, []);

  useEffect(() => {
    resetSimQueue(industryIdx);
  }, [industryIdx, resetSimQueue]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndustryIdx((i) => (i + 1) % industries.length);
    }, 5500);
    return () => clearInterval(id);
  }, [autoPlay, prefersReducedMotion, industries.length]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;
    const id = setInterval(() => {
      setMode((m) => {
        const i = demoModes.indexOf(m);
        return demoModes[(i + 1) % demoModes.length];
      });
    }, 5500);
    return () => clearInterval(id);
  }, [autoPlay, prefersReducedMotion]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || mode !== "waitlist") return;
    const id = setInterval(() => {
      setSimQueue((q) => ({
        position: Math.max(2, q.position - 1),
        ahead: Math.max(0, q.ahead - 1),
        wait: Math.max(5, q.wait - 2),
      }));
    }, 2200);
    return () => clearInterval(id);
  }, [autoPlay, prefersReducedMotion, mode]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || mode !== "booking") return;
    const slots = DEMO_TIME_SLOTS.filter((s) => s.available).slice(0, 6);
    const id = setInterval(() => {
      setBookingSlotIdx((i) => (i + 1) % slots.length);
    }, 1600);
    return () => clearInterval(id);
  }, [autoPlay, prefersReducedMotion, mode]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || mode !== "actions") return;
    const enabled = DEMO_OPTIONAL_ACTIONS.filter((a) => a.enabled);
    const id = setInterval(() => {
      setActionIdx((i) => (i + 1) % enabled.length);
    }, 2000);
    return () => clearInterval(id);
  }, [autoPlay, prefersReducedMotion, mode]);

  const pickMode = (key: DemoMode) => {
    setMode(key);
    setAutoPlay(false);
  };

  const pickIndustry = (i: number) => {
    setIndustryIdx(i);
    setAutoPlay(false);
  };

  const drop = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative overflow-hidden hero-grid min-h-[650px] lg:pt-28 pt-10 pb-24">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease }}
      />

      <motion.div className={cn("relative", siteContainerClass)}>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <div className="text-left">
            <motion.span
              {...drop}
              transition={{ duration: 0.45, ease }}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground"
            >
              <Play className="h-2.5 w-2.5 fill-current" />
              {t.hero.liveDemo}
            </motion.span>

            <h1 className={cn("mt-4 font-bold", marketingTitleClass)}>
              <motion.span
                className="block"
                {...drop}
                transition={{ duration: 0.5, delay: 0.05, ease }}
              >
                {t.hero.titlePrefix}
              </motion.span>
              <motion.span
                className="text-gradient block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                {t.hero.titleHighlight}
              </motion.span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease }}
              className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground"
            >
              {t.hero.subheadline}
            </motion.p>

            <ul className="mt-5 space-y-3">
              {t.problem.solutions.map((item, i) => {
                const Icon = featureIcons[i];
                return (
                  <motion.li
                    key={item.title}
                    className="flex gap-3"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.38 + i * 0.08, ease }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/5">
                      <Icon className="h-3.5 w-3.5 text-brand-500" />
                    </div>
                    <motion.div className="min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.62, ease }}
              className="mt-5 flex flex-wrap gap-1.5"
            >
              {t.hero.useCases.map((label, i) => {
                const key = demoModes[i];
                const active = mode === key;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => pickMode(key)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "bg-gradient-brand text-primary-foreground"
                        : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.7, ease }}
              className="mt-5 flex flex-wrap gap-2"
            >
              <ButtonLink
                href="/start"
                size="sm"
                className="h-9 rounded-full border-0 bg-gradient-brand px-4 text-xs text-primary-foreground hover:opacity-90"
              >
                {t.common.startTrial}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </ButtonLink>
              <ButtonLink
                href="/book/harbor-bistro"
                size="sm"
                variant="outline"
                className="h-9 rounded-full px-4 text-xs"
              >
                {t.common.tryDemo}
              </ButtonLink>
            </motion.div>
          </div>

          <div className="relative lg:sticky lg:top-20">
            <div className="mb-2.5 flex h-5 items-center justify-between gap-2 text-xs text-muted-foreground">
              <p className="truncate">
                <span className="font-medium text-foreground">{t.hero.demoExample}:</span>{" "}
                {industry?.label}
              </p>
              <span className="shrink-0 tabular-nums">
                {industryIdx + 1}/{industries.length}
              </span>
            </div>

            <IndustryTabBar
              industries={industries}
              industryIdx={industryIdx}
              onSelect={pickIndustry}
            />

            <div className="overflow-hidden rounded-xl bg-card/80">
              <DemoPanelHeader
                industryLabel={industry?.label ?? ""}
                autoPlay={autoPlay}
                onToggleAutoPlay={() => setAutoPlay((p) => !p)}
              />

              <div className="px-3.5 pb-4 pt-3">
                <motion.div
                  className={cn(
                    "overflow-x-hidden overflow-y-auto overscroll-contain px-1 py-2",
                    DEMO_PANEL_MIN_H,
                    DEMO_PANEL_MAX_H,
                    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${mode}-${industryIdx}`}
                      className="pb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {mode === "booking" && (
                        <BookingDemo activeSlotIdx={bookingSlotIdx} animate={autoPlay} />
                      )}
                      {mode === "waitlist" && (
                        <WaitlistDemo queue={simQueue} animate={autoPlay} />
                      )}
                      {mode === "actions" && (
                        <ActionsDemo activeIdx={actionIdx} animate={autoPlay} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border/50 px-3.5 py-2 text-[11px] text-muted-foreground">
                {autoPlay ? (
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                    </span>
                    {t.hero.autoDemo}
                  </span>
                ) : (
                  <span>{t.hero.demoPaused}</span>
                )}
                <Link
                  href="/book/harbor-bistro"
                  className="font-medium text-accent-cyan hover:underline"
                >
                  {t.hero.tryYourself}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function IndustryTabBar({
  industries,
  industryIdx,
  onSelect,
}: {
  industries: { label: string }[];
  industryIdx: number;
  onSelect: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, industries.length]);

  useEffect(() => {
    const container = scrollRef.current;
    const tab = tabRefs.current[industryIdx];
    if (!container || !tab) return;
    scrollTabWithinContainer(container, tab);
  }, [industryIdx]);

  const scrollTabs = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -180 : 180,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-3">
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent"
        aria-hidden
        initial={false}
        animate={{ opacity: canScrollLeft ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-r from-transparent to-background"
        aria-hidden
        initial={false}
        animate={{ opacity: canScrollRight ? 1 : 0 }}
      />

      <button
        type="button"
        onClick={() => scrollTabs("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll industries left"
        className={cn(
          "absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border border-border/60 bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-opacity",
          canScrollLeft ? "opacity-100 hover:border-accent-cyan/40 hover:bg-accent-cyan/10" : "pointer-events-none opacity-0"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex h-9 touch-pan-x gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-9 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((item, i) => {
          const Icon = industryIcons[i] ?? Building2;
          const active = i === industryIdx;
          return (
            <button
              key={item.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition-colors",
                active
                  ? "border-transparent bg-accent-cyan/10 text-foreground"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-3.5 w-3.5",
                  active ? "text-accent-cyan" : "text-muted-foreground"
                )}
              />
              <span className="whitespace-nowrap font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollTabs("right")}
        disabled={!canScrollRight}
        aria-label="Scroll industries right"
        className={cn(
          "absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border border-border/60 bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-opacity",
          canScrollRight ? "opacity-100 hover:border-accent-cyan/40 hover:bg-accent-cyan/10" : "pointer-events-none opacity-0"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function DemoPanelHeader({
  industryLabel,
  autoPlay,
  onToggleAutoPlay,
}: {
  industryLabel: string;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}) {
  const t = useT();

  return (
    <div className="flex items-center justify-between gap-2 border-b border-border/50 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand-br text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{t.hero.assistantLabel}</p>
          <p className="truncate text-[11px] text-muted-foreground">{industryLabel}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="hidden text-[11px] font-medium text-accent-emerald sm:inline">
          {t.common.live}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1 rounded-md border-border/60 px-2 text-[10px]"
          onClick={onToggleAutoPlay}
          aria-pressed={!autoPlay}
        >
          {autoPlay ? (
            <>
              <Pause className="h-3 w-3" />
              <span className="sr-only sm:not-sr-only">{t.hero.pauseDemo}</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3" />
              <span className="sr-only sm:not-sr-only">{t.hero.resumeDemo}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function WaitlistDemo({
  queue,
  animate,
}: {
  queue: { position: number; ahead: number; wait: number };
  animate: boolean;
}) {
  const t = useT();
  const progress = Math.min(100, ((12 - queue.ahead) / 12) * 100);
  const entries = DEMO_WAITLIST.slice(0, 4);

  return (
    <motion.div className="space-y-2.5 pb-2">
      <motion.div className="rounded-lg bg-muted/30 px-3 py-2.5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {t.hero.position}
        </p>
        <motion.p
          key={queue.position}
          className="mt-0.5 font-display text-2xl font-bold tabular-nums text-gradient"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          #{queue.position}
        </motion.p>
        {animate && queue.ahead <= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-[10px] font-medium text-accent-cyan"
          >
            {t.hero.almostYourTurn}
          </motion.p>
        )}
      </motion.div>

      <div className="space-y-1">
        <motion.div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-brand"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease }}
          />
        </motion.div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          {[
            { label: t.hero.position, value: `#${queue.position}` },
            { label: t.hero.ahead, value: String(queue.ahead) },
            { label: t.hero.estWait, value: `${queue.wait}m` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-md border border-border/40 bg-background/60 px-1.5 py-1"
            >
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              <p className="text-xs font-semibold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
          <Users className="h-3 w-3" />
          {t.hero.liveQueue}
        </p>
        <ul className="space-y-1">
          {entries.map((entry) => {
            const isYou = entry.customerName === "You";
            return (
              <li
                key={entry.id}
                className={cn(
                  "flex items-center justify-between rounded-md border px-2 py-1.5 text-[11px]",
                  entry.status === "called"
                    ? "border-accent-violet/30 bg-accent-violet/10"
                    : isYou
                      ? "border-accent-cyan/40 bg-accent-cyan/10"
                      : "border-border/40 bg-background/50"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                      entry.status === "called"
                        ? "bg-gradient-brand-br text-primary-foreground"
                        : "bg-accent-cyan/15 text-accent-cyan"
                    )}
                  >
                    {entry.position}
                  </span>
                  <span className={cn("font-medium", isYou && "text-accent-cyan")}>
                    {entry.customerName}
                  </span>
                </span>
                <span className="tabular-nums text-muted-foreground">~{entry.waitMinutes}m</span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

function BookingDemo({
  activeSlotIdx,
  animate,
}: {
  activeSlotIdx: number;
  animate: boolean;
}) {
  const t = useT();
  const slots = DEMO_TIME_SLOTS.filter((s) => s.available).slice(0, 6);

  return (
    <div className="space-y-2 pb-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
        <span>Today · Party of 2</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map((slot, i) => {
          const active = animate && i === activeSlotIdx;
          return (
            <button
              key={slot.id}
              type="button"
              className={cn(
                "rounded-md border px-1 py-2 text-[11px] font-medium transition-colors duration-300",
                active
                  ? "border-transparent bg-accent-cyan/15 text-accent-cyan"
                  : "border-border/50 bg-background/60 text-foreground"
              )}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
      {animate && (
        <motion.p
          key={activeSlotIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-[10px] text-accent-cyan"
        >
          {t.hero.slotSelected.replace("{time}", slots[activeSlotIdx]?.time ?? "")}
        </motion.p>
      )}
    </div>
  );
}

function ActionsDemo({ activeIdx, animate }: { activeIdx: number; animate: boolean }) {
  const enabled = DEMO_OPTIONAL_ACTIONS.filter((a) => a.enabled);

  return (
    <ul className="space-y-1.5 pb-2">
      {enabled.map((action, i) => {
        const active = animate && i === activeIdx;
        return (
          <li
            key={action.id}
            className={cn(
              "flex items-start gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300",
              active
                ? "border-transparent bg-accent-cyan/10"
                : "border-border/50 bg-background/60"
            )}
          >
            <CheckCircle2
              className={cn(
                "mt-0.5 h-3.5 w-3.5 shrink-0",
                active ? "text-accent-cyan" : "text-muted-foreground/50"
              )}
            />
            <div className="min-w-0">
              <p className="text-xs font-medium leading-tight">{action.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                {action.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
