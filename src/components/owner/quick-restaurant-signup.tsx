"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BusinessTypePicker } from "@/components/owner/business-type-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_BOOKING_MODES } from "@/lib/restaurant/constants";
import {
  addOwnerSlug,
  setAuthRole,
  setBookingMode,
  upsertRestaurant,
} from "@/lib/restaurant/storage";
import {
  buildRestaurantSlug,
  generateId,
  getBusinessTypeLabel,
} from "@/lib/restaurant/utils";
import type { MockBookingMode, Restaurant } from "@/lib/restaurant/types";
import {
  marketingBodyClass,
  marketingEyebrowClass,
  marketingTitleClass,
  siteContainerClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-9 w-full rounded-lg border-input bg-background text-sm shadow-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/35";

export function QuickRestaurantSignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState<string>("restaurant");
  const [bookingMode, setBookingMode] = useState<MockBookingMode>("reservation");
  const [facebookPageUrl, setFacebookPageUrl] = useState("");

  const slug = useMemo(
    () => (name.trim() ? buildRestaurantSlug(name, businessType) : ""),
    [name, businessType]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug = slug || buildRestaurantSlug(name, businessType);
    const typeLabel = getBusinessTypeLabel(businessType);
    const restaurant: Restaurant = {
      id: generateId(),
      slug: finalSlug,
      name: name.trim(),
      businessType,
      description: `${name.trim()} — ${typeLabel}`,
      address: "",
      phone: "",
      facebookPageUrl: facebookPageUrl.trim() || undefined,
      hours: [{ day: "Monday", open: "11:00", close: "22:00" }],
      coverPhoto:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      gallery: [],
      promotionSlots: [
        { time: "12:00", discount: 50 },
        { time: "18:00", discount: 20 },
      ],
      menu: [],
      reviews: [],
      rating: 4.5,
      reservations: 0,
      priceRange: 3,
    };

    upsertRestaurant(restaurant);
    addOwnerSlug(finalSlug);
    window.dispatchEvent(new Event("qzw-restaurants-updated"));
    setAuthRole("owner");
    setBookingMode(bookingMode);
    router.push("/dashboard?welcome=1");
  };

  return (
    <section className={siteContainerClass}>
      <div className="mx-auto max-w-md">
        <header className="text-center">
          <p className={marketingEyebrowClass}>ทดลองใช้ฟรี 14 วัน</p>
          <h1 className={cn(marketingTitleClass, "mt-2 text-xl sm:text-2xl")}>
            สมัครธุรกิจ — รับลิงก์จองทันที
          </h1>
          <p className={cn(marketingBodyClass, "mx-auto mt-2 max-w-sm text-sm")}>
            จอง คิว นัดหมาย — ร้านอาหาร คลินิก ธนาคาร ฟิตเนส และธุรกิจบริการอื่นๆ
          </p>
        </header>

        <Card className="mt-6 border-border/60 bg-card/50 p-5 shadow-sm sm:p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-medium">
                ชื่อธุรกิจ / ร้าน <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="เช่น Harbor Clinic"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="business-type" className="text-xs font-medium">
                ประเภทกิจการ <span className="text-destructive">*</span>
              </Label>
              <BusinessTypePicker
                id="business-type"
                value={businessType}
                onChange={setBusinessType}
                triggerClassName={fieldClass}
              />
            </div>

            <fieldset className="space-y-1.5">
              <legend className="text-xs font-medium">
                รูปแบบการจอง <span className="text-destructive">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_BOOKING_MODES.map((m) => {
                  const selected = bookingMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setBookingMode(m.id)}
                      className={cn(
                        "rounded-lg border px-2.5 py-2 text-left text-xs transition-colors",
                        selected
                          ? "border-brand-500/50 bg-brand-500/10 text-foreground"
                          : "border-border/60 text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <span className="block font-medium text-foreground">{m.label}</span>
                      <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug opacity-80">
                        {m.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="space-y-1.5">
              <Label htmlFor="fb" className="text-xs font-medium text-muted-foreground">
                ลิงก์เพจ Facebook (ไม่บังคับ)
              </Label>
              <Input
                id="fb"
                type="url"
                placeholder="https://facebook.com/your.page"
                value={facebookPageUrl}
                onChange={(e) => setFacebookPageUrl(e.target.value)}
                className={fieldClass}
              />
            </div>

            {/* พื้นที่คงที่ — ไม่กระตุกตอนพิมพ์ชื่อ */}
            <div
              className={cn(
                "min-h-8 rounded-lg border px-3 py-1.5 text-xs transition-colors duration-200",
                slug
                  ? "border-brand-500/20 bg-brand-500/5 text-muted-foreground"
                  : "border-transparent bg-transparent"
              )}
              aria-live="polite"
              aria-atomic
            >
              {slug ? (
                <>
                  ลิงก์ของคุณ:{" "}
                  <code className="font-mono text-foreground">/r/{slug}</code>
                </>
              ) : (
                <span className="invisible select-none">ลิงก์ของคุณ: /r/placeholder</span>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-10 w-full rounded-full border-0 bg-gradient-brand text-sm text-primary-foreground hover:opacity-90"
            >
              สร้างหน้าจองและเข้าแดชบอร์ด
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              ลูกค้าดูพาร์ทเนอร์ได้ที่{" "}
              <a href="/home" className="text-brand-500 hover:underline">
                /home
              </a>
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
