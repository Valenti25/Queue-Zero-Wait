"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CustomerMarketHeader } from "@/components/layout/customer-market-header";
import { RestaurantCustomerStorefront } from "@/components/restaurant/restaurant-customer-storefront";
import { QueueAgentFlow } from "@/components/customer/flows/queue-agent-flow";
import { useRestaurants } from "@/hooks/use-restaurants";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import { getCustomerBusiness } from "@/lib/customer/businesses";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import type { Restaurant } from "@/lib/restaurant/types";

export function PublicRestaurantPage({ slug }: { slug: string }) {
  const router = useRouter();
  const { restaurants, loaded } = useRestaurants();
  const r = restaurants.find((x) => x.slug === slug);

  /* ถ้าไม่เจอใน localStorage ให้เช็ค DEMO_BUSINESSES — ถ้าเป็น queue-agent ให้ redirect ไปหน้าจอง */
  const demoBusiness = !r && loaded ? getCustomerBusiness(slug) : null;

  useEffect(() => {
    if (demoBusiness?.flowKind === "queue-agent") {
      router.replace(`/book/${slug}`);
    }
  }, [demoBusiness, router, slug]);

  if (!loaded || demoBusiness?.flowKind === "queue-agent") {
    return (
      <div className="min-h-screen bg-muted/30">
        <CustomerMarketHeader />
        <p className="p-12 text-center text-muted-foreground">กำลังโหลด...</p>
      </div>
    );
  }

  if (!r) {
    return (
      <div className="min-h-screen bg-muted/30">
        <CustomerMarketHeader />
        <p className="p-12 text-center text-muted-foreground">
          ไม่พบร้าน — ตรวจสอบลิงก์ที่เจ้าของร้านส่งให้
        </p>
      </div>
    );
  }

  /* ร้านที่ register เป็น queue-agent — แสดง QueueAgentFlow โดยตรง */
  const businessType = getRestaurantBusinessType(r);
  if (businessType === "queue-agent") {
    const asBusiness: CustomerBusiness = {
      id: r.id,
      slug: r.slug,
      name: r.name,
      industry: "restaurant",
      flowKind: "queue-agent",
      icon: "⭐",
      contextLabel: "Exclusive · จองได้ที่นี่ที่เดียว",
      address: r.address,
      description: r.description,
      bookingMode: "waitlist",
      avgWaitMinutes: 45,
      googleBusinessConnected: false,
    };
    return <QueueAgentFlow business={asBusiness} />;
  }

  const typeLabel = getBusinessTypeLabel(businessType);
  const others = restaurants.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-muted/30 pb-16">
      <CustomerMarketHeader />

      <div className="mx-auto px-4 py-5 sm:px-6 lg:py-6">
        <nav
          aria-label="breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/home" className="hover:text-primary">
            หน้าหลัก
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
          <span>{typeLabel}</span>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
          <span className="font-medium text-foreground">{r.name}</span>
        </nav>

        <RestaurantCustomerStorefront restaurant={r} />

        {others.length > 0 && (
          <section className="mx-auto mt-10 max-w-7xl">
            <h2 className="mb-4 text-lg font-bold">ร้านอื่นๆ ที่น่าสนใจ</h2>
            <OthersGrid others={others} />
          </section>
        )}
      </div>
    </div>
  );
}

function OthersGrid({ others }: { others: Restaurant[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {others.map((o) => (
        <Link
          key={o.slug}
          href={`/r/${o.slug}`}
          className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition hover:shadow-md"
        >
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url(${o.coverPhoto})` }}
          />
          <div className="p-3">
            <p className="font-semibold text-sm">{o.name}</p>
            <p className="text-xs text-muted-foreground">
              {getBusinessTypeLabel(getRestaurantBusinessType(o))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
