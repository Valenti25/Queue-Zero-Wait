"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Store, Users } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Section, SectionHeader } from "@/components/shared/section";
import { ButtonLink } from "@/components/ui/button-link";
import { useT } from "@/components/providers/locale-provider";
import { marketingBodyClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

type Audience = "customer" | "merchant";
type BillingPeriod = "monthly" | "semiannual" | "yearly";

const MERCHANT_BASE_MONTHLY = [29, 79, null] as const;
const MERCHANT_HIGHLIGHT = 1;
const CUSTOMER_HIGHLIGHT = 1;

const CUSTOMER_HREFS = ["/book/harbor-bistro", "/queue/walk-in-demo", "/book/harbor-bistro"] as const;
const MERCHANT_HREFS = ["/start", "/start", "#"] as const;

const PERIOD_CONFIG: Record<
  BillingPeriod,
  { months: number; discount: number }
> = {
  monthly: { months: 1, discount: 0 },
  semiannual: { months: 6, discount: 0.05 },
  yearly: { months: 12, discount: 0.2 },
};

function merchantMonthlyPrice(planIndex: number): number | null {
  return MERCHANT_BASE_MONTHLY[planIndex] ?? null;
}

export function PricingSection() {
  const t = useT();
  const [audience, setAudience] = useState<Audience>("merchant");
  const [billing, setBilling] = useState<BillingPeriod>("yearly");
  const period = PERIOD_CONFIG[billing];

  return (
    <Section id="pricing">
      <SectionHeader
        eyebrow={t.pricing.eyebrow}
        title={t.pricing.title}
        description={t.pricing.description}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience}
          className={cn("mx-auto mt-4 max-w-5xl sm:mt-5", audience === "merchant" && "space-y-4")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {audience === "merchant" && (
              <BillingToggle
                billing={billing}
                onBillingChange={setBilling}
                labels={{
                  monthly: t.pricing.billingMonthly,
                  semiannual: t.pricing.billingSemiannual,
                  semiannualBadge: t.pricing.billingSemiannualBadge,
                  yearly: t.pricing.billingYearly,
                  yearlyBadge: t.pricing.billingYearlyBadge,
                }}
              />
          )}

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {(audience === "customer" ? t.pricing.customerPlans : t.pricing.merchantPlans).map(
                (plan, index) => {
                  const highlighted = index === (audience === "customer" ? CUSTOMER_HIGHLIGHT : MERCHANT_HIGHLIGHT);
                  const href =
                    audience === "customer"
                      ? CUSTOMER_HREFS[index]
                      : MERCHANT_HREFS[index];
                  const isFree = audience === "customer";
                  const monthly = !isFree ? merchantMonthlyPrice(index) : 0;
                  const effectiveMonthly =
                    monthly !== null ? Math.round(monthly * (1 - period.discount)) : null;
                  const periodTotal =
                    effectiveMonthly !== null ? effectiveMonthly * period.months : null;

                  const totalLabel =
                    periodTotal !== null
                      ? billing === "monthly"
                        ? t.pricing.totalMonthly.replace("${total}", String(periodTotal))
                        : t.pricing.totalForPeriod
                            .replace("{months}", String(period.months))
                            .replace("${total}", String(periodTotal))
                      : null;

                  return (
                    <PricingCard
                      key={plan.name}
                      name={plan.name}
                      description={plan.description}
                      features={plan.features}
                      cta={plan.cta}
                      href={href}
                      highlighted={highlighted}
                      recommendedLabel={t.pricing.recommended}
                      freeLabel={t.pricing.freeLabel}
                      perMonth={t.pricing.perMonth}
                      customLabel={t.pricing.custom}
                      isFree={isFree}
                      monthlyPrice={effectiveMonthly}
                      periodTotalLabel={totalLabel}
                    />
                  );
                }
              )}
          </div>
        </motion.div>
      </AnimatePresence>

      <FadeIn className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-2.5 sm:mt-8">
        <AudienceToggle
          value={audience}
          onChange={setAudience}
          customerLabel={t.pricing.tabCustomer}
          merchantLabel={t.pricing.tabMerchant}
        />
        <p className={cn("text-center", marketingBodyClass)}>
          {audience === "customer" ? t.pricing.customerLead : t.pricing.merchantLead}
        </p>
      </FadeIn>
    </Section>
  );
}

function AudienceToggle({
  value,
  onChange,
  customerLabel,
  merchantLabel,
}: {
  value: Audience;
  onChange: (v: Audience) => void;
  customerLabel: string;
  merchantLabel: string;
}) {
  return (
    <div
      role="tablist"
      className="relative grid h-9 w-full max-w-xs grid-cols-2 rounded-full border border-border/50 bg-muted/25 p-0.5"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-background shadow-sm ring-1 ring-border/50",
          value === "merchant" ? "left-1" : "left-[calc(50%+2px)]"
        )}
      />
      <button
        type="button"
        role="tab"
        aria-selected={value === "merchant"}
        onClick={() => onChange("merchant")}
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-medium",
          value === "merchant" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <Store className="h-3.5 w-3.5 text-brand-500" />
        {merchantLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "customer"}
        onClick={() => onChange("customer")}
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-medium",
          value === "customer" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <Users className="h-3.5 w-3.5 text-brand-500" />
        {customerLabel}
      </button>
    </div>
  );
}

function BillingToggle({
  billing,
  onBillingChange,
  labels,
}: {
  billing: BillingPeriod;
  onBillingChange: (v: BillingPeriod) => void;
  labels: {
    monthly: string;
    semiannual: string;
    semiannualBadge: string;
    yearly: string;
    yearlyBadge: string;
  };
}) {
  const periods: { id: BillingPeriod; label: string; badge?: string }[] = [
    { id: "monthly", label: labels.monthly },
    { id: "semiannual", label: labels.semiannual, badge: labels.semiannualBadge },
    { id: "yearly", label: labels.yearly, badge: labels.yearlyBadge },
  ];

  return (
    <div
      role="tablist"
      className="mx-auto flex max-w-md flex-wrap justify-center gap-1 rounded-full border border-border/40 p-0.5"
    >
        {periods.map((p) => {
          const active = billing === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onBillingChange(p.id)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
              {p.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    active ? "bg-white/20" : "bg-brand-500/15 text-brand-500"
                  )}
                >
                  {p.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

  );
}

function PricingCard({
  name,
  description,
  features,
  cta,
  href,
  highlighted,
  recommendedLabel,
  freeLabel,
  perMonth,
  customLabel,
  isFree,
  monthlyPrice,
  periodTotalLabel,
}: {
  name: string;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  highlighted: boolean;
  recommendedLabel: string;
  freeLabel: string;
  perMonth: string;
  customLabel: string;
  isFree: boolean;
  monthlyPrice: number | null;
  periodTotalLabel: string | null;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-lg border border-border/50 p-4",
        highlighted && "border-brand-500/80 ring-1 ring-brand-500/30"
      )}
    >
      {highlighted && (
        <span className="absolute right-3 top-3 rounded bg-gradient-brand px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
          {recommendedLabel}
        </span>
      )}

      <div className={cn("pr-12", highlighted && "pr-14")}>
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{description}</p>
      </div>

      <div className="mt-3 space-y-0.5">
        {isFree ? (
          <p className="text-2xl font-semibold tracking-tight text-gradient">{freeLabel}</p>
        ) : monthlyPrice !== null ? (
          <>
            <p className="flex items-baseline gap-0.5 tabular-nums">
              <span className="text-sm text-muted-foreground">$</span>
              <span className="text-2xl font-semibold tracking-tight">{monthlyPrice}</span>
              <span className="ml-0.5 text-xs text-muted-foreground">{perMonth}</span>
            </p>
            {periodTotalLabel && (
              <p className="text-[11px] text-muted-foreground">{periodTotalLabel}</p>
            )}
          </>
        ) : (
          <p className="text-xl font-semibold tracking-tight">{customLabel}</p>
        )}
      </div>

      <ButtonLink
        href={href}
        className={cn(
          "mt-3 h-8 w-full rounded-md text-xs font-medium",
          highlighted
            ? "border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
            : "border-border/60 bg-transparent text-foreground hover:bg-muted/30"
        )}
        variant={highlighted ? "default" : "outline"}
      >
        {cta}
      </ButtonLink>

      <ul className="mt-4 flex flex-1 flex-col gap-1.5 border-t border-border/40 pt-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2 text-[11px] leading-snug">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" strokeWidth={2.5} />
            <span className="leading-relaxed text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
