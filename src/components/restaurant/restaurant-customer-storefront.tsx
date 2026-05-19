"use client";

import { RestaurantBookingCard } from "@/components/restaurant/restaurant-booking-card";
import { RestaurantGalleryDisplay } from "@/components/restaurant/restaurant-gallery-display";
import { RestaurantStorefrontLayout } from "@/components/restaurant/restaurant-storefront-layout";
import {
  AboutPublicSection,
  AiSummarySection,
  FaqPublicSection,
  RecommendedMenuSection,
} from "@/components/restaurant/restaurant-public-sections";
import type { Restaurant } from "@/lib/restaurant/types";

/** หน้าร้านลูกค้าเต็มรูปแบบ (ข้อมูลจากที่บันทึกแล้ว — แสดงผลอย่างเดียว) */
export function RestaurantCustomerStorefront({ restaurant }: { restaurant: Restaurant }) {
  return (
    <RestaurantStorefrontLayout
      mode="public"
      gallery={
        <RestaurantGalleryDisplay
          coverPhoto={restaurant.coverPhoto}
          gallery={restaurant.gallery}
        />
      }
      sidebar={<RestaurantBookingCard restaurant={restaurant} />}
    >
      <AiSummarySection r={restaurant} />
      <RecommendedMenuSection r={restaurant} />
      <AboutPublicSection r={restaurant} />
      <FaqPublicSection r={restaurant} />
    </RestaurantStorefrontLayout>
  );
}
