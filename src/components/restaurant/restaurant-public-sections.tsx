"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Copy } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { getMaxDiscount } from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";
import {
  DEFAULT_HIGHLIGHT_BULLETS,
  DEFAULT_HIGHLIGHT_TAGS,
  DEFAULT_MENU_DISCLAIMER,
} from "@/lib/restaurant/defaults";

export function AiSummarySection({ r }: { r: Restaurant }) {
  const tags = r.highlightTags?.length ? r.highlightTags : DEFAULT_HIGHLIGHT_TAGS;
  const bullets = r.highlightBullets?.length
    ? r.highlightBullets
    : DEFAULT_HIGHLIGHT_BULLETS;
  const reviewCount = r.googleReviewCount ?? 508;

  const mustTry = bullets[0];
  const expect = bullets[1] ?? bullets[0];

  return (
    <section>
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <span aria-hidden>🍎</span>
        AI Summary
        <span className="font-normal text-muted-foreground">Google Highlights</span>
      </h2>
      <Card className="mt-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm">
        <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-700 dark:text-orange-300"
              >
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs">
              <span className="font-bold text-blue-600">G</span>
              <span className="text-muted-foreground">
                Rating: {r.rating.toFixed(1)} star
              </span>
            </span>
            <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            {mustTry ? (
              <p>
                <span className="mr-1.5 text-rose-500">◆</span>
                <span className="font-semibold text-foreground">Must Try</span>
                <br />
                {mustTry}
              </p>
            ) : null}
            {expect ? (
              <p>
                <span className="mr-1.5 text-rose-500">◆</span>
                <span className="font-semibold text-foreground">What To Expect</span>
                <br />
                {expect}
              </p>
            ) : null}
          </div>
        </div>
      </Card>
    </section>
  );
}

export function RecommendedMenuSection({ r }: { r: Restaurant }) {
  const [expanded, setExpanded] = useState(false);
  const maxDiscount = getMaxDiscount(r.promotionSlots);
  const disclaimer = r.menuDisclaimer || DEFAULT_MENU_DISCLAIMER;
  const items = expanded ? r.menu : r.menu.slice(0, 4);

  if (!r.menu.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight">เมนูแนะนำ</h2>
        {maxDiscount > 0 && (
          <button
            type="button"
            className="inline-flex items-center gap-0.5 text-sm font-semibold text-primary"
            onClick={() => setExpanded((e) => !e)}
          >
            สูงสุด -{maxDiscount}%
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{disclaimer}</p>
      <ul className="mt-2 divide-y divide-border/60">
        {items.map((m) => (
          <li key={m.id} className="flex gap-4 py-4">
            {m.photo ? (
              <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-muted sm:h-20 sm:w-20">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  className="object-cover"
                  unoptimized={m.photo.startsWith("data:")}
                />
              </div>
            ) : null}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <span className="font-medium text-foreground">{m.name}</span>
              <span className="shrink-0 text-right text-sm">
                {m.discountedPrice != null && m.discountedPrice < m.price ? (
                  <>
                    <span className="font-semibold text-foreground">฿{m.discountedPrice}</span>{" "}
                    <span className="text-muted-foreground line-through">฿{m.price}</span>
                  </>
                ) : (
                  <span className="font-semibold">฿{m.price}</span>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {r.menu.length > 4 && !expanded && (
        <p className="mt-2 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-sm font-semibold text-primary hover:underline"
          >
            ดูเมนูทั้งหมด
          </button>
        </p>
      )}
    </section>
  );
}

export function AboutPublicSection({ r }: { r: Restaurant }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight">เกี่ยวกับร้าน</h2>
      <Card className="rounded-2xl border-border/60 p-5 sm:p-6">
        {r.address ? (
          <>
            <p className="text-sm leading-relaxed text-foreground">{r.address}</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              onClick={() => void navigator.clipboard.writeText(r.address)}
            >
              <Copy className="h-3.5 w-3.5" />
              คัดลอกที่อยู่
            </button>
          </>
        ) : null}
        {r.description ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
        ) : null}
        {r.mapEmbedUrl ? (
          <iframe
            title="map"
            src={r.mapEmbedUrl}
            className="mt-5 aspect-video w-full rounded-xl border border-border/60"
          />
        ) : null}
      </Card>
    </section>
  );
}

export function FaqPublicSection({ r }: { r: Restaurant }) {
  if (!r.faqs?.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight">คำถามที่พบบ่อย</h2>
      <Accordion className="rounded-2xl border border-border/60 bg-card px-1 sm:px-2">
        {r.faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="px-3 text-sm font-medium hover:no-underline sm:px-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm leading-relaxed text-muted-foreground sm:px-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
