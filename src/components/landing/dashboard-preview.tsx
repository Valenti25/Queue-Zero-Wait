"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Landmark,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Stethoscope,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/components/providers/locale-provider";
import {
  marketingBodyClass,
  marketingEyebrowClass,
  marketingTitleClass,
} from "@/lib/layout";
import { DEMO_WAITLIST } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SCENE_COUNT = 5;
const CYCLE_MS = 5200;
const TICK_MS = 2800;
const PANEL_HEIGHT = "h-[21rem]";

const sceneIcons: LucideIcon[] = [
  Stethoscope,
  Scissors,
  Landmark,
  Dumbbell,
  UtensilsCrossed,
];

type SceneKind = "clinic" | "salon" | "bank" | "fitness" | "restaurant";

const sceneKinds: SceneKind[] = ["clinic", "salon", "bank", "fitness", "restaurant"];

export function DashboardPreview() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const industries = t.industries.items.slice(0, SCENE_COUNT);
  const scenes = t.dashboardPreview.scenes;

  const [sceneIdx, setSceneIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  const scene = scenes[sceneIdx];
  const kind = sceneKinds[sceneIdx] ?? "restaurant";

  const running = autoPlay && !paused && !prefersReducedMotion;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSceneIdx((i) => (i + 1) % SCENE_COUNT);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), TICK_MS);
    return () => clearInterval(id);
  }, [running, sceneIdx]);

  const pickScene = useCallback((index: number) => {
    setSceneIdx(index);
    setTick(0);
  }, []);

  return (
    <Section id="customer-preview" className="overflow-hidden bg-muted/20 py-14 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <FadeIn>
          <p className={marketingEyebrowClass}>{t.dashboardPreview.eyebrow}</p>
          <h2 className={cn("mt-2", marketingTitleClass)}>{t.dashboardPreview.title}</h2>
          <p className={cn("mt-3", marketingBodyClass)}>{t.dashboardPreview.description}</p>
          <ul className="mt-6 space-y-2.5">
            {t.dashboardPreview.highlights.map((text) => (
              <li key={text} className="flex items-start gap-2.5 text-xs text-foreground/90 sm:text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <span className="leading-snug">{text}</span>
              </li>
            ))}
          </ul>
          <ButtonLink
            href="/book/harbor-bistro"
            className="mt-8 h-10 rounded-full border-0 bg-gradient-brand px-5 text-sm text-primary-foreground hover:opacity-90"
          >
            {t.dashboardPreview.explore}
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto w-full max-w-[340px] lg:max-w-none lg:justify-self-end">
            <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <p className="truncate">
                <span className="font-medium text-foreground">{t.dashboardPreview.demoLabel}:</span>{" "}
                {industries[sceneIdx]?.label}
              </p>
              <span className="shrink-0 tabular-nums">
                {sceneIdx + 1}/{SCENE_COUNT}
              </span>
            </div>

            <SceneTabBar
              industries={industries}
              sceneIdx={sceneIdx}
              onSelect={pickScene}
            />

            <div
              className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/80 shadow-lg"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <PhoneHeader
                businessName={scene?.businessName ?? ""}
                contextLabel={scene?.contextLabel ?? ""}
                autoPlay={autoPlay}
                onToggle={() => setAutoPlay((p) => !p)}
              />

              <div className={cn("relative overflow-hidden", PANEL_HEIGHT)}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={sceneIdx}
                    className="absolute inset-0 overflow-y-auto px-3.5 pb-3 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.22,
                      ease: "easeInOut",
                    }}
                  >
                    {kind === "clinic" && scene && (
                      <ClinicScene scene={scene} tick={tick} animate={running} />
                    )}
                    {kind === "salon" && scene && (
                      <SalonScene scene={scene} tick={tick} animate={running} />
                    )}
                    {kind === "bank" && scene && (
                      <BankScene scene={scene} tick={tick} animate={running} />
                    )}
                    {kind === "fitness" && scene && (
                      <FitnessScene scene={scene} tick={tick} animate={running} />
                    )}
                    {kind === "restaurant" && scene && (
                      <RestaurantScene scene={scene} tick={tick} animate={running} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-border/50 px-3.5 py-2.5 text-[11px] text-muted-foreground">
                {autoPlay && !paused ? (
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                    </span>
                    {t.dashboardPreview.autoPlay}
                  </span>
                ) : (
                  <span>{t.dashboardPreview.paused}</span>
                )}
                <Link
                  href="/book/harbor-bistro"
                  className="font-medium text-accent-cyan hover:underline"
                >
                  {t.dashboardPreview.tryYourself}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

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

function SceneTabBar({
  industries,
  sceneIdx,
  onSelect,
}: {
  industries: { label: string }[];
  sceneIdx: number;
  onSelect: (index: number) => void;
}) {
  const t = useT();
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
    const tab = tabRefs.current[sceneIdx];
    if (!container || !tab) return;
    scrollTabWithinContainer(container, tab);
  }, [sceneIdx]);

  const scrollTabs = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-2">
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-7 bg-gradient-to-r from-muted/20 to-transparent transition-opacity",
          canScrollLeft ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-7 bg-gradient-to-r from-transparent to-muted/20 transition-opacity",
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      />

      <button
        type="button"
        onClick={() => scrollTabs("left")}
        disabled={!canScrollLeft}
        aria-label={t.dashboardPreview.scrollTabsLeft}
        className={cn(
          "absolute left-0 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-border/60 bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-opacity",
          canScrollLeft
            ? "opacity-100 hover:border-accent-cyan/40 hover:bg-accent-cyan/10"
            : "pointer-events-none opacity-0"
        )}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>

      <div
        ref={scrollRef}
        className="flex touch-pan-x gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-8 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((item, i) => {
          const Icon = sceneIcons[i] ?? UtensilsCrossed;
          const active = i === sceneIdx;
          return (
            <button
              key={item.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors",
                active
                  ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                  : "border-border/60 bg-card/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollTabs("right")}
        disabled={!canScrollRight}
        aria-label={t.dashboardPreview.scrollTabsRight}
        className={cn(
          "absolute right-0 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-border/60 bg-card/95 text-foreground shadow-sm backdrop-blur-sm transition-opacity",
          canScrollRight
            ? "opacity-100 hover:border-accent-cyan/40 hover:bg-accent-cyan/10"
            : "pointer-events-none opacity-0"
        )}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PhoneHeader({
  businessName,
  contextLabel,
  autoPlay,
  onToggle,
}: {
  businessName: string;
  contextLabel: string;
  autoPlay: boolean;
  onToggle: () => void;
}) {
  const t = useT();

  return (
    <div className="border-b border-border/50 px-3.5 py-2.5">
      <div className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-muted" aria-hidden />
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand-br text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{businessName}</p>
            <p className="truncate text-[10px] text-muted-foreground">{contextLabel}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Badge className="h-5 border-accent-emerald/30 bg-accent-emerald/10 px-1.5 text-[9px] text-accent-emerald">
            {t.dashboardPreview.liveBadge}
          </Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 w-7 rounded-md border-border/60 p-0"
            onClick={onToggle}
            aria-pressed={!autoPlay}
          >
            {autoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span className="sr-only">{autoPlay ? t.dashboardPreview.pause : t.dashboardPreview.resume}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

type SceneCopy = {
  businessName: string;
  contextLabel: string;
  positionLabel: string;
  aheadLabel: string;
  waitLabel: string;
  position: string;
  ahead: string;
  wait: string;
  extraLine?: string;
  stages?: readonly string[];
  activeStage?: number;
  ticket?: string;
  service?: string;
  counter?: string;
  className?: string;
  classTime?: string;
  spotsLabel?: string;
  spots?: string;
  notifyLabel?: string;
};

function ClinicScene({
  scene,
  tick,
  animate,
}: {
  scene: SceneCopy;
  tick: number;
  animate: boolean;
}) {
  const t = useT();
  const stages = scene.stages ?? [];
  const activeStage = animate ? (tick % stages.length) : (scene.activeStage ?? 0);
  const ahead = Math.max(0, Number(scene.ahead) - (tick % 3));

  return (
    <div className="space-y-3 pb-1">
      <ol className="flex items-center justify-between gap-1">
        {stages.map((label, i) => {
          const done = i < activeStage;
          const current = i === activeStage;
          return (
            <li key={label} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                  done && "bg-accent-emerald/15 text-accent-emerald",
                  current && "bg-accent-cyan/15 text-accent-cyan ring-2 ring-accent-cyan/30",
                  !done && !current && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-center text-[9px] leading-tight",
                  current ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      <PositionCard
        position={scene.position}
        ahead={String(ahead)}
        wait={scene.wait}
        labels={{
          position: scene.positionLabel,
          ahead: scene.aheadLabel,
          wait: scene.waitLabel,
        }}
      />
      {scene.extraLine && (
        <p className="text-center text-[10px] text-muted-foreground">{scene.extraLine}</p>
      )}
      <NotifyRow label={scene.notifyLabel ?? t.dashboardPreview.notifyOn} />
    </div>
  );
}

function SalonScene({ scene, tick, animate }: { scene: SceneCopy; tick: number; animate: boolean }) {
  const ahead = Math.max(0, Number(scene.ahead) - (tick % 2));
  const progress = animate ? Math.min(100, 35 + (tick % 4) * 18) : 55;

  return (
    <div className="space-y-3 pb-1">
      <div className="rounded-lg border border-accent-violet/25 bg-accent-violet/8 px-3 py-2.5 text-center">
        <p className="text-[10px] text-muted-foreground">{scene.extraLine}</p>
        <p className="mt-0.5 font-display text-sm font-semibold text-foreground">{scene.service}</p>
      </div>
      <PositionCard
        position={scene.position}
        ahead={String(ahead)}
        wait={scene.wait}
        labels={{
          position: scene.positionLabel,
          ahead: scene.aheadLabel,
          wait: scene.waitLabel,
        }}
      />
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{scene.className}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-brand"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <NotifyRow label={scene.notifyLabel ?? ""} />
    </div>
  );
}

function BankScene({ scene, tick, animate }: { scene: SceneCopy; tick: number; animate: boolean }) {
  const t = useT();
  const called = animate && tick % 4 === 3;

  return (
    <div className="space-y-3 pb-1">
      <div
        className={cn(
          "rounded-xl border px-4 py-5 text-center transition-colors duration-500",
          called
            ? "border-accent-emerald/40 bg-accent-emerald/10"
            : "border-border/50 bg-muted/30"
        )}
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {scene.positionLabel}
        </p>
        <p className="mt-1 font-display text-4xl font-bold tabular-nums tracking-tight text-gradient">
          {scene.ticket}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{scene.service}</p>
        <div className="mt-2 flex min-h-[2.25rem] items-center justify-center">
          <p
            className={cn(
              "text-center leading-snug transition-opacity duration-300",
              called
                ? "text-sm font-semibold text-accent-emerald"
                : "text-[11px] text-muted-foreground"
            )}
          >
            {called
              ? t.dashboardPreview.bankCalled.replace("{counter}", scene.counter ?? "")
              : scene.extraLine}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-2 gap-2 text-center transition-opacity duration-300",
          called && "pointer-events-none opacity-0"
        )}
        aria-hidden={called}
      >
        <StatPill label={scene.aheadLabel} value={scene.ahead} />
        <StatPill label={scene.waitLabel} value={`~${scene.wait}m`} />
      </div>
      <NotifyRow label={scene.notifyLabel ?? t.dashboardPreview.notifyOn} />
    </div>
  );
}

function FitnessScene({ scene, tick, animate }: { scene: SceneCopy; tick: number; animate: boolean }) {
  const filled = animate ? Math.min(92, 58 + (tick % 5) * 8) : 66;

  return (
    <div className="space-y-3 pb-1">
      <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/60 px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-amber/10 text-accent-amber">
          <Dumbbell className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold">{scene.className}</p>
          <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {scene.classTime}
          </p>
        </div>
      </div>
      <div className="rounded-lg bg-muted/30 px-3 py-2.5 text-center">
        <p className="text-[10px] text-muted-foreground">{scene.spotsLabel}</p>
        <p className="mt-0.5 text-lg font-semibold tabular-nums">{scene.spots}</p>
      </div>
      <div className="space-y-1">
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent-amber"
            style={{ width: `${filled}%` }}
          />
        </div>
        <p className="text-center text-[10px] text-muted-foreground">{scene.extraLine}</p>
      </div>
      <NotifyRow label={scene.notifyLabel ?? ""} />
    </div>
  );
}

function RestaurantScene({
  scene,
  tick,
  animate,
}: {
  scene: SceneCopy;
  tick: number;
  animate: boolean;
}) {
  const t = useT();
  const position = Math.max(2, Number(scene.position.replace(/\D/g, "")) - (tick % 3));
  const ahead = Math.max(0, Number(scene.ahead) - (tick % 3));
  const wait = Math.max(5, Number(scene.wait.replace(/\D/g, "")) - (tick % 2) * 2);
  const progress = Math.min(100, ((12 - ahead) / 12) * 100);
  const entries = DEMO_WAITLIST.slice(0, 4);

  return (
    <div className="space-y-2.5 pb-1">
      <div className="rounded-lg bg-muted/30 px-3 py-2.5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {scene.positionLabel}
        </p>
        <p className="mt-0.5 font-display text-2xl font-bold tabular-nums text-gradient">
          #{position}
        </p>
        <p
          className={cn(
            "mt-1 min-h-[1.125rem] text-[10px] font-medium text-accent-cyan",
            !(animate && ahead <= 1) && "invisible"
          )}
        >
          {t.hero.almostYourTurn}
        </p>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-brand"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <StatPill label={scene.positionLabel} value={`#${position}`} compact />
          <StatPill label={scene.aheadLabel} value={String(ahead)} compact />
          <StatPill label={scene.waitLabel} value={`${wait}m`} compact />
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
                  isYou
                    ? "border-accent-cyan/40 bg-accent-cyan/10"
                    : "border-border/40 bg-background/50"
                )}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-cyan/15 text-[10px] font-semibold text-accent-cyan">
                    {entry.position}
                  </span>
                  <span className={cn(isYou && "text-accent-cyan")}>{entry.customerName}</span>
                </span>
                <span className="tabular-nums text-muted-foreground">~{entry.waitMinutes}m</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function PositionCard({
  position,
  ahead,
  wait,
  labels,
}: {
  position: string;
  ahead: string;
  wait: string;
  labels: { position: string; ahead: string; wait: string };
}) {
  return (
    <>
      <div className="rounded-lg bg-muted/30 px-3 py-2.5 text-center">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {labels.position}
        </p>
        <p className="mt-0.5 font-display text-2xl font-bold tabular-nums text-gradient">{position}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatPill label={labels.ahead} value={ahead} />
        <StatPill label={labels.wait} value={`~${wait}m`} />
      </div>
    </>
  );
}

function StatPill({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border/40 bg-background/60 text-center",
        compact ? "px-1.5 py-1" : "px-2 py-2"
      )}
    >
      <p className={cn("text-muted-foreground", compact ? "text-[9px]" : "text-[10px]")}>{label}</p>
      <p className={cn("font-semibold tabular-nums", compact ? "text-xs" : "text-sm")}>{value}</p>
    </div>
  );
}

function NotifyRow({ label }: { label: string }) {
  if (!label) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 rounded-md border border-border/50 bg-background/50 py-2 text-[10px] text-muted-foreground">
      <Bell className="h-3 w-3 text-accent-cyan" />
      {label}
    </div>
  );
}

