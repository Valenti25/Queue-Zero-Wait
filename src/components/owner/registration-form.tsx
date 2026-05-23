"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BusinessTypePicker } from "@/components/owner/business-type-picker";
import {
  RestaurantStorefrontEditor,
  type StorefrontEditorState,
} from "@/components/owner/restaurant-storefront-editor";
import { RestaurantBookingPreview } from "@/components/owner/restaurant-booking-preview";
import { RestaurantStorefrontLayout } from "@/components/restaurant/restaurant-storefront-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DAYS_OF_WEEK } from "@/lib/restaurant/constants";
import {
  DEFAULT_HIGHLIGHT_BULLETS,
  DEFAULT_HIGHLIGHT_TAGS,
  DEFAULT_MENU_DISCLAIMER,
  SAMPLE_MENU_ITEMS,
  defaultFaqs,
} from "@/lib/restaurant/defaults";
import { addOwnerSlug, upsertRestaurant } from "@/lib/restaurant/storage";
import {
  generateId,
  buildRestaurantSlug,
  getBusinessTypeLabel,
  getRestaurantBusinessType,
  getMaxDiscount,
  inferPriceFromMenu,
} from "@/lib/restaurant/utils";
import type { OpeningHours, MenuItem, PromotionSlot, Restaurant } from "@/lib/restaurant/types";
import { cn } from "@/lib/utils";

const defaultHours: OpeningHours[] = DAYS_OF_WEEK.map((day) => ({
  day,
  open: "11:00",
  close: "22:00",
}));

const fieldClass =
  "h-9 w-full rounded-lg border-input bg-background text-sm shadow-none";

function buildDefaultMenu(cover: string): MenuItem[] {
  return SAMPLE_MENU_ITEMS.map((m) => ({
    ...m,
    id: generateId(),
    photo: cover || "",
  }));
}

export const RESTAURANT_STOREFRONT_FORM_ID = "restaurant-storefront-form";

export function restaurantFormSubmitLabel(mode: "create" | "edit") {
  return mode === "create" ? "บันทึกและไปแดชบอร์ด" : "บันทึก";
}

export function RegistrationForm({
  initial,
  mode = "create",
  formId = RESTAURANT_STOREFRONT_FORM_ID,
  hideSubmit = false,
}: {
  initial?: Restaurant;
  mode?: "create" | "edit";
  formId?: string;
  hideSubmit?: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [businessType, setBusinessType] = useState(
    initial ? getRestaurantBusinessType(initial) : "restaurant"
  );
  const [facebookPageUrl, setFacebookPageUrl] = useState(initial?.facebookPageUrl ?? "");
  const [hours] = useState(initial?.hours ?? defaultHours);
  const [coverPhoto, setCoverPhoto] = useState(initial?.coverPhoto ?? "");
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? []);
  const [promotionSlots, setPromotionSlots] = useState<PromotionSlot[]>(
    initial?.promotionSlots ?? [{ time: "12:00", discount: 50 }]
  );
  const [menu, setMenu] = useState<MenuItem[]>(
    initial?.menu?.length
      ? initial.menu
      : buildDefaultMenu(initial?.coverPhoto ?? "")
  );
  const [highlightTags, setHighlightTags] = useState(
    initial?.highlightTags ?? [...DEFAULT_HIGHLIGHT_TAGS]
  );
  const [highlightBullets, setHighlightBullets] = useState(
    initial?.highlightBullets ?? [...DEFAULT_HIGHLIGHT_BULLETS]
  );
  const [googleReviewCount, setGoogleReviewCount] = useState(
    initial?.googleReviewCount ?? 508
  );
  const [menuDisclaimer, setMenuDisclaimer] = useState(
    initial?.menuDisclaimer ?? DEFAULT_MENU_DISCLAIMER
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initial?.mapEmbedUrl ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 4.7);
  const [faqs, setFaqs] = useState(
    initial?.faqs?.length ? initial.faqs : defaultFaqs(initial?.name ?? "")
  );
  const [reservations] = useState(initial?.reservations ?? 259);
  const [priceRange] = useState(initial?.priceRange ?? 3);

  const slug = useMemo(
    () => (name.trim() ? buildRestaurantSlug(name, businessType) : initial?.slug ?? ""),
    [name, businessType, initial?.slug]
  );

  const storefrontPatch = (patch: Partial<StorefrontEditorState>) => {
    if (patch.coverPhoto !== undefined) setCoverPhoto(patch.coverPhoto);
    if (patch.gallery !== undefined) setGallery(patch.gallery);
    if (patch.menu !== undefined) setMenu(patch.menu);
    if (patch.menuDisclaimer !== undefined) setMenuDisclaimer(patch.menuDisclaimer);
    if (patch.description !== undefined) setDescription(patch.description);
    if (patch.address !== undefined) setAddress(patch.address);
    if (patch.phone !== undefined) setPhone(patch.phone);
    if (patch.mapEmbedUrl !== undefined) setMapEmbedUrl(patch.mapEmbedUrl);
    if (patch.faqs !== undefined) setFaqs(patch.faqs);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug || buildRestaurantSlug(name, businessType);
    const typeLabel = getBusinessTypeLabel(businessType);
    const restaurant: Restaurant = {
      id: initial?.id ?? generateId(),
      slug: finalSlug,
      name: name.trim(),
      businessType,
      description: description || `${name.trim()} — ${typeLabel}`,
      address,
      phone,
      facebookPageUrl: facebookPageUrl.trim() || undefined,
      mapEmbedUrl: mapEmbedUrl || undefined,
      hours,
      coverPhoto:
        coverPhoto || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      gallery,
      promotionSlots,
      menu: menu.map((m) => ({ ...m, photo: m.photo || coverPhoto })),
      reviews: initial?.reviews ?? [],
      rating,
      reservations,
      priceRange: inferPriceFromMenu(menu).level || priceRange,
      highlightTags,
      highlightBullets,
      googleReviewCount,
      menuDisclaimer,
      faqs,
    };
    await upsertRestaurant(restaurant);
    addOwnerSlug(finalSlug);
    window.dispatchEvent(new Event("qzw-restaurants-updated"));
    if (mode === "create") router.push("/dashboard?welcome=1");
    else router.push(`/dashboard/manage/${finalSlug}`);
  };

  const maxMenuDiscount = getMaxDiscount(promotionSlots);

  return (
    <form id={formId} onSubmit={submit} className="space-y-6">
      <RestaurantStorefrontLayout
        mode="editor"
        sidebar={
          <RestaurantBookingPreview
            showLabel
            showCoverImage
            name={name}
            businessType={businessType}
            address={address}
            coverPhoto={coverPhoto}
            menu={menu}
            reviews={initial?.reviews ?? []}
            priceRange={priceRange}
            promotionSlots={promotionSlots}
            rating={rating}
            reservations={reservations}
          />
        }
      >
        <RestaurantStorefrontEditor
          shopName={name}
          maxMenuDiscount={maxMenuDiscount}
          coverPhoto={coverPhoto}
          gallery={gallery}
          menu={menu}
          menuDisclaimer={menuDisclaimer}
          description={description}
          address={address}
          phone={phone}
          mapEmbedUrl={mapEmbedUrl}
          faqs={faqs}
          onCoverChange={setCoverPhoto}
          onGalleryChange={setGallery}
          onChange={storefrontPatch}
          belowPhotos={
            <CardSettings
              name={name}
              setName={setName}
              businessType={businessType}
              setBusinessType={setBusinessType}
              slug={slug}
              facebookPageUrl={facebookPageUrl}
              setFacebookPageUrl={setFacebookPageUrl}
              promotionSlots={promotionSlots}
              setPromotionSlots={setPromotionSlots}
            />
          }
        />
      </RestaurantStorefrontLayout>

      {!hideSubmit ? (
        <Button
          type="submit"
          className="h-11 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
        >
          {restaurantFormSubmitLabel(mode)}
        </Button>
      ) : null}
    </form>
  );
}

function CardSettings({
  name,
  setName,
  businessType,
  setBusinessType,
  slug,
  facebookPageUrl,
  setFacebookPageUrl,
  promotionSlots,
  setPromotionSlots,
}: {
  name: string;
  setName: (v: string) => void;
  businessType: string;
  setBusinessType: (v: string) => void;
  slug: string;
  facebookPageUrl: string;
  setFacebookPageUrl: (v: string) => void;
  promotionSlots: PromotionSlot[];
  setPromotionSlots: (v: PromotionSlot[]) => void;
}) {
  return (
    <section className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
      <h2 className="text-base font-semibold text-foreground">ข้อมูลพื้นฐาน</h2>
      <div className="mt-4 space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">ชื่อธุรกิจ / ร้าน *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={fieldClass}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">ประเภทกิจการ *</Label>
        <BusinessTypePicker
          value={businessType}
          onChange={setBusinessType}
          triggerClassName={fieldClass}
        />
        <p className="text-xs text-muted-foreground">/r/{slug || "..."}</p>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Facebook</Label>
        <Input
          value={facebookPageUrl}
          onChange={(e) => setFacebookPageUrl(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">โปรโมชั่น (เวลา + %)</Label>
        {promotionSlots.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input
              type="time"
              value={s.time}
              onChange={(e) => {
                const n = [...promotionSlots];
                n[i] = { ...s, time: e.target.value };
                setPromotionSlots(n);
              }}
              className={cn(fieldClass, "flex-1")}
            />
            <Input
              type="number"
              value={s.discount}
              onChange={(e) => {
                const n = [...promotionSlots];
                n[i] = { ...s, discount: Number(e.target.value) };
                setPromotionSlots(n);
              }}
              className={cn(fieldClass, "w-20")}
            />
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
