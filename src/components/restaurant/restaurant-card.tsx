"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  getBusinessTypeLabel,
  getMaxDiscount,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const max = getMaxDiscount(restaurant.promotionSlots);
  return (
    <Link href={`/r/${restaurant.slug}`} className="group block">
      <Card className="overflow-hidden rounded-2xl border-0 shadow-md transition hover:scale-[1.02]">
        <div className="relative aspect-[4/3]">
          <Image
            src={restaurant.coverPhoto}
            alt={restaurant.name}
            fill
            className="object-cover"
            unoptimized={restaurant.coverPhoto.startsWith("data:")}
          />
          {max > 0 && (
            <Badge className="absolute left-3 top-3 border-0 bg-primary text-primary-foreground">
              UP TO {max}%
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between gap-2">
            <h3 className="font-semibold line-clamp-1">{restaurant.name}</h3>
            <span className="flex items-center gap-0.5 text-amber-500 text-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {getBusinessTypeLabel(getRestaurantBusinessType(restaurant))}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{restaurant.description}</p>
        </div>
      </Card>
    </Link>
  );
}
