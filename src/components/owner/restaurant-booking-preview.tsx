"use client";

import { RestaurantBookingCard } from "@/components/restaurant/restaurant-booking-card";
import type { MenuItem, PromotionSlot, Restaurant, RestaurantReview } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  businessType: string;
  address: string;
  coverPhoto: string;
  menu: MenuItem[];
  reviews?: RestaurantReview[];
  priceRange?: number;
  promotionSlots: PromotionSlot[];
  rating?: number;
  reservations?: number;
  className?: string;
  showLabel?: boolean;
  showCoverImage?: boolean;
  /** @deprecated ใช้ RestaurantBookingCard บนหน้า /r โดยตรง */
  variant?: "preview" | "public";
  compact?: boolean;
};

/** ตัวอย่างหน้าลูกค้าในแดชบอร์ด — สร้างจากข้อมูลฟอร์มปัจจุบัน */
export function RestaurantBookingPreview({
  name,
  businessType,
  address,
  coverPhoto,
  menu,
  priceRange = 3,
  promotionSlots,
  rating = 4.7,
  reservations = 0,
  className,
  showLabel = true,
  showCoverImage = true,
}: Props) {
  const restaurant: Restaurant = {
    id: "preview",
    slug: "preview",
    name: name.trim() || "ชื่อร้านของคุณ",
    businessType,
    description: "",
    address,
    phone: "",
    hours: [],
    coverPhoto,
    gallery: [],
    promotionSlots,
    menu,
    reviews: [],
    rating,
    reservations,
    priceRange,
  };

  return (
    <div className={cn("min-w-0", className)}>
      {showLabel ? (
        <p className="mb-2 text-xs font-medium text-muted-foreground">ตัวอย่างหน้าลูกค้า (ขวา)</p>
      ) : null}
      <RestaurantBookingCard restaurant={restaurant} showCoverImage={showCoverImage} />
    </div>
  );
}
