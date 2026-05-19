"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, Search, Users } from "lucide-react";
import { CustomerMarketHeader } from "@/components/layout/customer-market-header";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { OwnerPortalFab } from "@/components/restaurant/owner-portal-fab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRestaurants } from "@/hooks/use-restaurants";
import { PARTNER_CATEGORIES } from "@/lib/restaurant/constants";
import {
  getBusinessTypeLabel,
  getMaxDiscount,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import { cn } from "@/lib/utils";

export function PartnerHome() {
  const { restaurants, loaded } = useRestaurants();
  const [category, setCategory] = useState("all");
  const [q, setQ] = useState("");

  const featured = useMemo(
    () =>
      [...restaurants]
        .filter((r) => getMaxDiscount(r.promotionSlots) > 0)
        .slice(0, 2),
    [restaurants]
  );

  const list = useMemo(() => {
    let r = restaurants;
    if (category !== "all") {
      r = r.filter((x) => getRestaurantBusinessType(x) === category);
    }
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((x) => {
        const typeLabel = getBusinessTypeLabel(getRestaurantBusinessType(x));
        return (
          x.name.toLowerCase().includes(s) ||
          typeLabel.toLowerCase().includes(s) ||
          x.address.toLowerCase().includes(s)
        );
      });
    }
    return r;
  }, [restaurants, category, q]);

  return (
    <div className="min-h-screen bg-background">
      <CustomerMarketHeader />

      <section className="border-b border-border/60 bg-muted/30 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              จองและเข้าคิว <span className="text-gradient">คุ้มทุกมื้อ</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              ร้านอาหาร คลินิก ฟิตเนส และธุรกิจบริการ — ค้นหาแล้วจองได้ทันที
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
            <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_2fr_auto]">
              <label className="flex items-center gap-2 border-b border-border/50 px-4 py-3 sm:border-b-0 sm:border-r">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">วันที่</span>
                <input type="date" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              </label>
              <label className="flex items-center gap-2 border-b border-border/50 px-4 py-3 sm:border-b-0 sm:border-r">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">เวลา</span>
                <input type="time" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              </label>
              <label className="flex items-center gap-2 border-b border-border/50 px-4 py-3 lg:border-b-0 lg:border-r">
                <Users className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs text-muted-foreground">จำนวนคน</span>
                <select className="min-w-0 flex-1 bg-transparent text-sm outline-none" defaultValue="2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 lg:border-b-0 lg:border-r">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Input
                  className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  placeholder="ค้นหาร้าน, ประเภท, ย่าน..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center p-2 sm:p-3">
                <Button type="button" className="h-11 w-full min-w-[3rem] sm:w-11 sm:px-0" aria-label="ค้นหา">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-sm text-muted-foreground">
            จองร้านพาร์ทเนอร์ในภูเก็ต พร้อมส่วนลดสูงสุดทุกวัน
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {featured.map((r) => {
              const max = getMaxDiscount(r.promotionSlots);
              return (
                <a
                  key={r.id}
                  href={`/r/${r.slug}`}
                  className="group flex overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:border-primary/40"
                >
                  <div
                    className="hidden w-2/5 shrink-0 bg-cover bg-center sm:block"
                    style={{ backgroundImage: `url(${r.coverPhoto})` }}
                  />
                  <div className="flex flex-1 flex-col justify-center p-5">
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      สูงสุด {max}%
                    </span>
                    <h3 className="mt-1 text-lg font-semibold group-hover:text-primary">{r.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                    <span className="mt-3 text-sm font-medium text-primary">จองเลย →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-lg font-semibold">ประเภทธุรกิจ</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {PARTNER_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition",
                category === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <h2 className="mb-4 mt-8 text-xl font-bold">ร้านพาร์ทเนอร์</h2>
        {!loaded ? (
          <p className="text-muted-foreground">กำลังโหลด...</p>
        ) : list.length === 0 ? (
          <p className="text-muted-foreground">ไม่พบร้านที่ตรงกับการค้นหา</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>

      <OwnerPortalFab />
    </div>
  );
}
