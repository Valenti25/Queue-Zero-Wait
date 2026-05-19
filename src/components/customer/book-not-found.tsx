"use client";

import Link from "next/link";
import { DEMO_BUSINESS_SLUGS } from "@/lib/customer/businesses";
import { useT } from "@/components/providers/locale-provider";

const DEMO_LABELS: Record<string, string> = {
  "harbor-bistro": "Harbor Bistro",
  "bangkok-care-clinic": "Bangkok Care Clinic",
  "luna-salon": "Luna Salon",
  "siam-trust-bank": "Siam Trust Bank",
  "pulse-studio": "Pulse Studio",
};

export function BookNotFound({ slug }: { slug: string }) {
  const t = useT();

  return (
    <div className="space-y-6 text-center">
      <div>
        <p className="text-sm font-medium text-brand-500">{slug}</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">{t.customerFlow.notFound}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.customerFlow.notFoundDesc}</p>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t.customerFlow.demoLinks}
        </p>
        <ul className="flex flex-col gap-2">
          {DEMO_BUSINESS_SLUGS.map((s) => (
            <li key={s}>
              <Link
                href={`/book/${s}`}
                className="block rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-sm font-medium transition-colors hover:border-brand-300 hover:bg-brand-50/30"
              >
                {DEMO_LABELS[s] ?? s}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
