"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Lightbulb,
  Megaphone,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useT } from "@/components/providers/locale-provider";
import {
  MERCHANT_METRICS,
  buildMarketingActions,
  buildMerchantInsights,
  getSourceLabel,
  type InsightKind,
  type MerchantInsight,
} from "@/lib/merchant-analytics";
import { cn } from "@/lib/utils";

const kindStyles: Record<InsightKind, { icon: LucideIcon; badge: string; dot: string }> = {
  trend: {
    icon: TrendingUp,
    badge: "bg-brand-500/10 text-brand-500 border-brand-500/25",
    dot: "bg-brand-500",
  },
  opportunity: {
    icon: Lightbulb,
    badge: "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30",
    dot: "bg-accent-emerald",
  },
  risk: {
    icon: Target,
    badge: "bg-accent-amber/10 text-accent-amber border-accent-amber/30",
    dot: "bg-accent-amber",
  },
  marketing: {
    icon: Megaphone,
    badge: "bg-accent-violet/10 text-accent-violet border-accent-violet/30",
    dot: "bg-accent-violet",
  },
};

const kindLabelKey: Record<
  InsightKind,
  "kindTrend" | "kindOpportunity" | "kindRisk" | "kindMarketing"
> = {
  trend: "kindTrend",
  opportunity: "kindOpportunity",
  risk: "kindRisk",
  marketing: "kindMarketing",
};

type MerchantAiDashboardProps = {
  embedded?: boolean;
  previewLayout?: boolean;
};

export function MerchantAiDashboard({
  embedded = false,
  previewLayout = false,
}: MerchantAiDashboardProps) {
  const t = useT();
  const { locale } = useLocale();
  const [refreshing, setRefreshing] = useState(false);

  const isEmbed = embedded || previewLayout;

  const insights = useMemo(() => buildMerchantInsights(locale), [locale]);
  const actions = useMemo(() => buildMarketingActions(locale), [locale]);
  const m = MERCHANT_METRICS;

  const maxHourly = Math.max(...m.hourlyDemand.map((h) => h.bookings + h.waitlist));

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 900);
  };

  const cardTitleClass = cn("font-display text-base");

  return (
    <section
      id="insights"
      className={cn(
        "space-y-6",
        previewLayout &&
          "pointer-events-none select-none text-sm leading-snug [&_.text-muted-foreground]:text-foreground/70"
      )}
    >
      <DashSection embedded={isEmbed}>
        <Card className="overflow-hidden border-border/60 bg-card/50">
          {!previewLayout && (
            <div className="border-b border-border/50 bg-gradient-brand-br px-5 py-4 text-primary-foreground sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide opacity-90">
                        {t.merchant.ai.badge}
                      </p>
                      <h2 className="font-display text-lg font-semibold sm:text-xl">
                        {t.merchant.ai.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm opacity-90">{t.merchant.ai.subtitle}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="shrink-0 border-0 bg-white/15 text-primary-foreground hover:bg-white/25"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw
                    className={cn("mr-1.5 h-3.5 w-3.5", refreshing && "animate-spin")}
                  />
                  {refreshing ? t.merchant.ai.refreshing : t.merchant.ai.refresh}
                </Button>
              </div>
            </div>
          )}

          <CardContent
            className={cn(
              "grid gap-4 p-5 sm:p-6",
              previewLayout ? "grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"
            )}
          >
            <SnapshotStat
              previewLayout={previewLayout}
              icon={CalendarDays}
              label={t.merchant.ai.statBookings}
              value={String(m.totalBookings)}
              hint={fmtPeriod(t.merchant.ai.periodDays, m.periodDays)}
            />
            <SnapshotStat
              previewLayout={previewLayout}
              icon={Users}
              label={t.merchant.ai.statWaitlist}
              value={String(m.totalWaitlistJoins)}
              hint={t.merchant.ai.statWaitlistHint}
            />
            <SnapshotStat
              previewLayout={previewLayout}
              icon={BarChart3}
              label={t.merchant.ai.statAvgParty}
              value={m.avgPartySize.toFixed(1)}
              hint={t.merchant.ai.statAvgPartyHint}
            />
            <SnapshotStat
              previewLayout={previewLayout}
              icon={TrendingUp}
              label={t.merchant.ai.statRepeat}
              value={`${m.repeatCustomerPct}%`}
              hint={t.merchant.ai.statRepeatHint}
            />
          </CardContent>
        </Card>
      </DashSection>

      <div className={cn("grid gap-6", previewLayout ? "grid-cols-5" : "lg:grid-cols-5")}>
        <DashSection
          embedded={isEmbed}
          className={previewLayout ? "col-span-3" : "lg:col-span-3"}
          delay={0.05}
        >
          <Card className="h-full border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2", cardTitleClass)}>
                <Sparkles className="h-4 w-4 text-brand-500" />
                {t.merchant.ai.summaryTitle}
              </CardTitle>
              <CardDescription>{t.merchant.ai.summaryDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <p
                className={cn(
                  "rounded-xl border border-border/60 bg-muted/30 px-4 py-3 leading-relaxed text-foreground/90",
                  previewLayout ? "text-xs" : "text-sm"
                )}
              >
                {t.merchant.ai.executiveSummary}
              </p>
              <ul className="space-y-3">
                {insights.map((insight) => (
                  <InsightRow
                    key={insight.id}
                    insight={insight}
                    kindLabel={t.merchant.ai[kindLabelKey[insight.kind]]}
                    refreshing={refreshing}
                    previewLayout={previewLayout}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </DashSection>

        <DashSection
          embedded={isEmbed}
          className={previewLayout ? "col-span-2" : "lg:col-span-2"}
          delay={0.1}
        >
          <Card className="h-full border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2", cardTitleClass)}>
                <Megaphone className="h-4 w-4 text-accent-violet" />
                {t.merchant.ai.marketingTitle}
              </CardTitle>
              <CardDescription>{t.merchant.ai.marketingDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className={cn(
                    "group rounded-xl border border-border/60 bg-muted/20 transition-colors hover:border-brand-500/30 hover:bg-brand-500/5",
                    previewLayout ? "p-3.5" : "p-3.5"
                  )}
                >
                  <p
                    className={cn(
                      "font-medium text-foreground",
                      previewLayout ? "text-sm" : "text-sm"
                    )}
                  >
                    {action.title}
                  </p>
                  <p
                    className={cn(
                      "mt-1 leading-relaxed text-muted-foreground",
                      previewLayout ? "text-xs" : "text-xs"
                    )}
                  >
                    {action.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-brand-500/25 text-brand-500",
                        previewLayout ? "text-[10px]" : "text-[10px]"
                      )}
                    >
                      {action.impact}
                    </Badge>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-0.5 font-medium text-brand-500 opacity-0 transition-opacity group-hover:opacity-100",
                        previewLayout ? "text-[10px]" : "text-[11px]"
                      )}
                    >
                      {t.merchant.ai.actionCta}
                      <ArrowRight className={previewLayout ? "h-3.5 w-3.5" : "h-3 w-3"} />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </DashSection>
      </div>

      <div className={cn("grid gap-6", previewLayout ? "grid-cols-3" : "lg:grid-cols-3")}>
        <DashSection
          embedded={isEmbed}
          className={previewLayout ? "col-span-2" : "lg:col-span-2"}
          delay={0.12}
        >
          <Card className="h-full border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className={cardTitleClass}>{t.merchant.ai.peakTitle}</CardTitle>
              <CardDescription>{t.merchant.ai.peakDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end gap-2 sm:gap-3" style={{ minHeight: "9rem" }}>
                {m.hourlyDemand.map((slot) => {
                  const total = slot.bookings + slot.waitlist;
                  const heightPct = maxHourly > 0 ? (total / maxHourly) * 100 : 0;
                  const bookingPct = total > 0 ? (slot.bookings / total) * 100 : 0;
                  return (
                    <div key={slot.label} className="flex flex-1 flex-col items-center gap-1.5">
                      <div
                        className="flex w-full max-w-10 flex-col justify-end overflow-hidden rounded-t-md bg-muted/50"
                        style={{ height: "7rem" }}
                        title={`${slot.label}: ${slot.bookings} ${t.merchant.ai.legendBookings}, ${slot.waitlist} ${t.merchant.ai.legendWaitlist}`}
                      >
                        <div
                          className="w-full bg-accent-violet/70 transition-all duration-500"
                          style={{ height: `${(heightPct * (100 - bookingPct)) / 100}%` }}
                        />
                        <div
                          className="w-full bg-gradient-brand transition-all duration-500"
                          style={{ height: `${(heightPct * bookingPct) / 100}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "tabular-nums text-muted-foreground",
                          previewLayout ? "text-[10px]" : "text-[10px]"
                        )}
                      >
                        {slot.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div
                className={cn(
                  "mt-4 flex flex-wrap gap-4 text-muted-foreground",
                  previewLayout ? "text-xs" : "text-xs"
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-gradient-brand" />
                  {t.merchant.ai.legendBookings}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-accent-violet/70" />
                  {t.merchant.ai.legendWaitlist}
                </span>
              </div>
            </CardContent>
          </Card>
        </DashSection>

        <DashSection embedded={isEmbed} delay={0.15}>
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className={cardTitleClass}>{t.merchant.ai.mixTitle}</CardTitle>
              <CardDescription>{t.merchant.ai.mixDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">
              <div>
                <p
                  className={cn(
                    "mb-2 font-medium text-muted-foreground",
                    previewLayout ? "text-xs" : "text-xs"
                  )}
                >
                  {t.merchant.ai.partyTitle}
                </p>
                <div className="space-y-2">
                  {m.partySizes.map((row) => (
                    <ShareBar
                      key={row.label}
                      label={row.label}
                      pct={row.pct}
                      previewLayout={previewLayout}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "mb-2 font-medium text-muted-foreground",
                    previewLayout ? "text-xs" : "text-xs"
                  )}
                >
                  {t.merchant.ai.sourceTitle}
                </p>
                <div className="space-y-2">
                  {m.bookingSources.map((row) => (
                    <ShareBar
                      key={row.label}
                      label={getSourceLabel(locale, row.label)}
                      pct={row.pct}
                      previewLayout={previewLayout}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "mb-2 font-medium text-muted-foreground",
                    previewLayout ? "text-xs" : "text-xs"
                  )}
                >
                  {t.merchant.ai.requestsTitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.merchant.ai.topRequests.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={cn("font-normal", previewLayout ? "text-[10px]" : "text-[11px]")}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </DashSection>
      </div>

      {!isEmbed && (
        <DashSection embedded={false} delay={0.18}>
          <p className="text-center text-xs text-muted-foreground">{t.merchant.ai.disclaimer}</p>
        </DashSection>
      )}
    </section>
  );
}

function DashSection({
  children,
  className,
  delay,
  embedded,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  embedded?: boolean;
}) {
  if (embedded) {
    return <div className={className}>{children}</div>;
  }
  return (
    <FadeIn className={className} delay={delay}>
      {children}
    </FadeIn>
  );
}

function fmtPeriod(template: string, days: number) {
  return template.replace("{days}", String(days));
}

function SnapshotStat({
  icon: Icon,
  label,
  value,
  hint,
  previewLayout = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  previewLayout?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
      <Icon className={cn("text-brand-500", previewLayout ? "h-4 w-4" : "h-4 w-4")} />
      <p
        className={cn(
          "mt-2 font-semibold tabular-nums",
          previewLayout ? "text-2xl" : "text-2xl"
        )}
      >
        {value}
      </p>
      <p className={cn("font-medium text-foreground", previewLayout ? "text-xs" : "text-xs")}>
        {label}
      </p>
      <p className={cn("text-muted-foreground", previewLayout ? "text-[10px]" : "text-[11px]")}>
        {hint}
      </p>
    </div>
  );
}

function InsightRow({
  insight,
  kindLabel,
  refreshing,
  previewLayout = false,
}: {
  insight: MerchantInsight;
  kindLabel: string;
  refreshing: boolean;
  previewLayout?: boolean;
}) {
  const style = kindStyles[insight.kind];
  const Icon = style.icon;

  return (
    <li
      className={cn(
        "flex gap-3 rounded-xl border border-border/60 bg-card/80 transition-opacity",
        previewLayout ? "p-3.5" : "p-3.5",
        refreshing && "opacity-60"
      )}
    >
      <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", style.dot)} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Icon
            className={cn(
              "text-muted-foreground",
              previewLayout ? "h-4 w-4" : "h-3.5 w-3.5"
            )}
          />
          <p className={cn("font-medium text-foreground", previewLayout ? "text-sm" : "text-sm")}>
            {insight.title}
          </p>
          <Badge
            variant="outline"
            className={cn(style.badge, previewLayout ? "text-[10px]" : "text-[10px]")}
          >
            {kindLabel}
          </Badge>
          {insight.metric && (
            <span
              className={cn(
                "ml-auto font-semibold tabular-nums text-brand-500",
                previewLayout ? "text-xs" : "text-xs"
              )}
            >
              {insight.metric}
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-1 leading-relaxed text-muted-foreground",
            previewLayout ? "text-xs" : "text-xs"
          )}
        >
          {insight.body}
        </p>
      </div>
    </li>
  );
}

function ShareBar({
  label,
  pct,
  previewLayout = false,
}: {
  label: string;
  pct: number;
  previewLayout?: boolean;
}) {
  return (
    <div>
      <div className={cn("mb-1 flex justify-between", previewLayout ? "text-xs" : "text-xs")}>
        <span className="text-foreground">{label}</span>
        <span className="tabular-nums text-muted-foreground">{pct}%</span>
      </div>
      <div className={cn("overflow-hidden rounded-full bg-muted", previewLayout ? "h-2" : "h-2")}>
        <div
          className="h-full rounded-full bg-gradient-brand transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
