import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { DEMO_BUSINESS } from "@/lib/mock-data";

export type InsightKind = "trend" | "opportunity" | "risk" | "marketing";

export interface MerchantInsight {
  id: string;
  kind: InsightKind;
  title: string;
  body: string;
  metric?: string;
}

export interface HourlyDemand {
  label: string;
  bookings: number;
  waitlist: number;
}

export interface NamedShare {
  label: string;
  value: number;
  pct: number;
}

export interface MarketingAction {
  id: string;
  title: string;
  description: string;
  impact: string;
}

/** Demo analytics — replace with API / AI pipeline later */
export const MERCHANT_METRICS = {
  periodDays: 7,
  totalBookings: 86,
  totalWaitlistJoins: 142,
  avgPartySize: 3.2,
  repeatCustomerPct: 34,
  googleSharePct: 58,
  directSharePct: 28,
  walkInSharePct: 14,
  peakHour: "18:00",
  peakHourBookings: 22,
  peakHourSharePct: 26,
  busiestDay: "Saturday",
  slowWindow: "Tue 14:00–16:00",
  noShowPct: 4,
  largePartyPct: 17,
  birthdayNotesPct: 12,
  avgWaitMinutes: 18,
  hourLabels: ["11:00", "12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00"],
  hourlyDemand: [
    { label: "11:00", bookings: 8, waitlist: 12 },
    { label: "12:00", bookings: 18, waitlist: 24 },
    { label: "13:00", bookings: 14, waitlist: 19 },
    { label: "14:00", bookings: 6, waitlist: 9 },
    { label: "17:00", bookings: 12, waitlist: 18 },
    { label: "18:00", bookings: 22, waitlist: 31 },
    { label: "19:00", bookings: 16, waitlist: 21 },
    { label: "20:00", bookings: 10, waitlist: 8 },
  ] satisfies HourlyDemand[],
  partySizes: [
    { label: "2", value: 39, pct: 45 },
    { label: "3–4", value: 33, pct: 38 },
    { label: "5+", value: 14, pct: 17 },
  ] satisfies NamedShare[],
  bookingSources: [
    { label: "google", value: 50, pct: 58 },
    { label: "direct", value: 24, pct: 28 },
    { label: "walkin", value: 12, pct: 14 },
  ] satisfies NamedShare[],
  topRequests: ["window seat", "birthday", "vegetarian", "high chair"],
} as const;

function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}

export function buildMerchantInsights(locale: Locale): MerchantInsight[] {
  const ai = getDictionary(locale).merchant.ai;
  const m = MERCHANT_METRICS;

  return [
    {
      id: "peak-dinner",
      kind: "trend",
      title: ai.insightPeakTitle,
      body: fmt(ai.insightPeakBody, {
        hour: m.peakHour,
        count: m.peakHourBookings,
        pct: m.peakHourSharePct,
        day: m.busiestDay,
      }),
      metric: `${m.peakHourSharePct}%`,
    },
    {
      id: "google-channel",
      kind: "opportunity",
      title: ai.insightGoogleTitle,
      body: fmt(ai.insightGoogleBody, {
        pct: m.googleSharePct,
        business: DEMO_BUSINESS.name,
      }),
      metric: `${m.googleSharePct}%`,
    },
    {
      id: "party-mix",
      kind: "marketing",
      title: ai.insightPartyTitle,
      body: fmt(ai.insightPartyBody, {
        avg: m.avgPartySize,
        largePct: m.largePartyPct,
        birthdayPct: m.birthdayNotesPct,
      }),
      metric: `${m.avgPartySize}`,
    },
    {
      id: "slow-slot",
      kind: "opportunity",
      title: ai.insightSlowTitle,
      body: fmt(ai.insightSlowBody, {
        window: m.slowWindow,
        waitlist: m.totalWaitlistJoins,
      }),
    },
    {
      id: "repeat-guests",
      kind: "trend",
      title: ai.insightRepeatTitle,
      body: fmt(ai.insightRepeatBody, {
        pct: m.repeatCustomerPct,
        bookings: m.totalBookings,
      }),
      metric: `${m.repeatCustomerPct}%`,
    },
    {
      id: "no-show",
      kind: "risk",
      title: ai.insightNoShowTitle,
      body: fmt(ai.insightNoShowBody, {
        pct: m.noShowPct,
        avgWait: m.avgWaitMinutes,
      }),
      metric: `${m.noShowPct}%`,
    },
  ];
}

export function buildMarketingActions(locale: Locale): MarketingAction[] {
  const ai = getDictionary(locale).merchant.ai;
  const m = MERCHANT_METRICS;

  return [
    {
      id: "off-peak",
      title: ai.actionOffPeakTitle,
      description: fmt(ai.actionOffPeakDesc, { window: m.slowWindow }),
      impact: ai.actionOffPeakImpact,
    },
    {
      id: "large-party",
      title: ai.actionLargePartyTitle,
      description: fmt(ai.actionLargePartyDesc, { pct: m.largePartyPct }),
      impact: ai.actionLargePartyImpact,
    },
    {
      id: "google-post",
      title: ai.actionGoogleTitle,
      description: fmt(ai.actionGoogleDesc, { pct: m.googleSharePct }),
      impact: ai.actionGoogleImpact,
    },
    {
      id: "birthday",
      title: ai.actionBirthdayTitle,
      description: fmt(ai.actionBirthdayDesc, { pct: m.birthdayNotesPct }),
      impact: ai.actionBirthdayImpact,
    },
  ];
}

export function getSourceLabel(locale: Locale, key: string): string {
  const labels = getDictionary(locale).merchant.ai.sources;
  if (key === "google") return labels.google;
  if (key === "direct") return labels.direct;
  return labels.walkin;
}
