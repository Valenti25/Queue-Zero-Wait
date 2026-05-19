"use client";

import Image from "next/image";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { EatigoBookingPanel } from "@/components/booking/eatigo-booking-panel";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
  formatPriceLevelDisplay,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

/** การ์ดจองหน้าลูกค้า (แสดงผลเสร็จ — ไม่ใช่ฟอร์มแก้ไขร้าน) */
export function RestaurantBookingCard({
  restaurant,
  className,
  showCoverImage = true,
}: {
  restaurant: Restaurant;
  className?: string;
  showCoverImage?: boolean;
}) {
  const img = restaurant.coverPhoto || PLACEHOLDER;
  const typeLabel = getBusinessTypeLabel(getRestaurantBusinessType(restaurant));
  const priceInfo = formatPriceLevelDisplay(restaurant.menu, restaurant.priceRange);
  const reservations = restaurant.reservations ?? 0;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-md">
        {showCoverImage ? (
          <div className="relative aspect-[16/10] w-full bg-muted">
            <Image
              src={img}
              alt={restaurant.name}
              fill
              className="object-cover"
              unoptimized={img.startsWith("data:")}
              priority
            />
          </div>
        ) : null}

        <div className="space-y-3 p-4 sm:p-5">
            <h1 className="text-lg font-bold leading-snug text-foreground sm:text-xl">
              {restaurant.name}
            </h1>
            {restaurant.address ? (
              <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                <span className="min-w-0 flex-1">{restaurant.address}</span>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              </p>
            ) : null}

          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground sm:text-sm">
            <span className="text-foreground">{typeLabel}</span>
            {priceInfo.symbols ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  <span className="text-amber-500">{priceInfo.symbols}</span>
                  <span className="ml-1">({priceInfo.label})</span>
                </span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <button
              type="button"
              className="inline-flex items-center gap-0.5 text-foreground/90 hover:text-primary"
            >
              Business Hours
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <p className="flex items-center gap-1 text-xs sm:text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{restaurant.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              | {reservations > 0 ? reservations.toLocaleString() : "—"} reservations
            </span>
          </p>

          <EatigoBookingPanel
            slots={restaurant.promotionSlots}
            hideTitle
            appearance="customer"
            showFooterNext
          />
        </div>
      </div>
    </div>
  );
}
