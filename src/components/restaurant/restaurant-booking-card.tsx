"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronLeft, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EatigoBookingPanel, type BookingSelection } from "@/components/booking/eatigo-booking-panel";
import { createBooking } from "@/lib/supabase/bookings";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
  formatPriceLevelDisplay,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

type Step = "picker" | "form" | "confirmed";

function formatDateThai(iso: string) {
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

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
  const [step, setStep] = useState<Step>("picker");
  const [selection, setSelection] = useState<BookingSelection | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const img = restaurant.coverPhoto || PLACEHOLDER;
  const typeLabel = getBusinessTypeLabel(getRestaurantBusinessType(restaurant));
  const priceInfo = formatPriceLevelDisplay(restaurant.menu, restaurant.priceRange);
  const reservations = restaurant.reservations ?? 0;

  const handleNext = (sel: BookingSelection) => {
    setSelection(sel);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selection) return;
    setBookingError("");
    setSubmitting(true);
    try {
      const result = await createBooking({
        businessId: restaurant.id,
        customerName: name.trim(),
        customerEmail: email.trim(),
        date: selection.date,
        time: selection.time ?? "",
        partySize: parseInt(selection.party, 10),
      });
      if (!result) {
        setBookingError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      } else {
        setStep("confirmed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("picker");
    setSelection(null);
    setName("");
    setEmail("");
    setBookingError("");
  };

  return (
    <div className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-md">
        {showCoverImage ? (
          <div className="relative aspect-16/10 w-full bg-muted">
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

          {/* Step: Picker */}
          {step === "picker" && (
            <EatigoBookingPanel
              slots={restaurant.promotionSlots}
              hideTitle
              appearance="customer"
              showFooterNext
              onNext={handleNext}
            />
          )}

          {/* Step: Contact form */}
          {step === "form" && selection && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setStep("picker")}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  แก้ไข
                </button>
                <span>·</span>
                <span>
                  {selection.party} คน · {formatDateThai(selection.date)} · {selection.time}
                  {selection.discount != null ? ` · -${selection.discount}%` : ""}
                </span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="booking-name" className="text-xs">ชื่อ-นามสกุล</Label>
                <Input
                  id="booking-name"
                  placeholder="สมชาย ดีใจ"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booking-email" className="text-xs">อีเมล (สำหรับรับการยืนยัน)</Label>
                <Input
                  id="booking-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              {bookingError && <p className="text-xs text-destructive">{bookingError}</p>}
              <Button
                type="submit"
                className="h-10 w-full rounded-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
                disabled={submitting}
              >
                {submitting ? "กำลังจอง..." : "ยืนยันการจอง"}
              </Button>
            </form>
          )}

          {/* Step: Confirmed */}
          {step === "confirmed" && (
            <div className="space-y-3 py-2 text-center">
              <CheckCircle className="mx-auto h-10 w-10 text-accent-emerald" />
              <div>
                <p className="font-semibold text-foreground">จองสำเร็จแล้ว!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  เราจะส่งการยืนยันไปที่อีเมลของคุณ
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-sm text-brand-500 hover:underline"
              >
                จองอีกครั้ง
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
