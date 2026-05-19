"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Plus, UtensilsCrossed } from "lucide-react";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import { ButtonLink } from "@/components/ui/button-link";
import { getOwnerRestaurants } from "@/lib/restaurant/storage";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";

/** Restaurant links block — styled to match merchant dashboard cards */
export function RestaurantOwnerPanel() {
  const [owned, setOwned] = useState<Restaurant[]>([]);

  useEffect(() => {
    setOwned(getOwnerRestaurants());
  }, []);

  return (
    <section
      id="restaurant"
      className="rounded-xl border border-border/60 bg-card/50 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8193C]/10 text-[#E8193C]">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              หน้าร้าน & ลิงก์ลูกค้า
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              สมัครร้าน → ได้ลิงก์ /r/[slug] ให้ลูกค้าจอง (mock localhost + Vercel)
            </p>
          </div>
        </div>
        <ButtonLink href="/dashboard/register" size="sm" className="bg-[#E8193C] text-white">
          <Plus className="mr-1.5 h-4 w-4" />
          สมัครร้าน
        </ButtonLink>
      </div>

      {owned.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          ยังไม่มีร้านที่ลงทะเบียน — กดสมัครร้านเพื่อสร้างลิงก์
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {owned.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-border/40 bg-background/50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getBusinessTypeLabel(getRestaurantBusinessType(r))}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ButtonLink href={`/dashboard/manage/${r.slug}`} variant="outline" size="sm">
                    จัดการ
                  </ButtonLink>
                  <ButtonLink
                    href={`/r/${r.slug}`}
                    target="_blank"
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="mr-1 h-3.5 w-3.5" />
                    หน้าลูกค้า
                  </ButtonLink>
                </div>
              </div>
              <RestaurantLinks slug={r.slug} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
