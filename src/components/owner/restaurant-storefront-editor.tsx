"use client";

import { Copy, Plus, Trash2 } from "lucide-react";
import { RestaurantPhotoPanel } from "@/components/owner/restaurant-photo-panel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FaqItem, MenuItem } from "@/lib/restaurant/types";
import { generateId } from "@/lib/restaurant/utils";
import { cn } from "@/lib/utils";

const fieldClass = "h-9 w-full rounded-lg border-input bg-background text-sm";

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/60 bg-card p-4 sm:p-5",
        className
      )}
    >
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export type StorefrontEditorState = {
  coverPhoto: string;
  gallery: string[];
  menu: MenuItem[];
  menuDisclaimer: string;
  description: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  faqs: FaqItem[];
};

type Props = StorefrontEditorState & {
  shopName: string;
  maxMenuDiscount: number;
  onCoverChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
  onChange: (patch: Partial<StorefrontEditorState>) => void;
  /** แสดงใต้บล็อกรูป (เช่น ข้อมูลพื้นฐาน) */
  belowPhotos?: React.ReactNode;
};

export function RestaurantStorefrontEditor({
  shopName,
  maxMenuDiscount,
  coverPhoto,
  gallery,
  menu,
  menuDisclaimer,
  description,
  address,
  phone,
  mapEmbedUrl,
  faqs,
  onCoverChange,
  onGalleryChange,
  onChange,
  belowPhotos,
}: Props) {
  const updateMenuItem = (index: number, patch: Partial<MenuItem>) => {
    const next = menu.map((m, i) => (i === index ? { ...m, ...patch } : m));
    onChange({ menu: next });
  };

  const addMenuRow = () => {
    onChange({
      menu: [
        ...menu,
        {
          id: generateId(),
          name: "",
          photo: coverPhoto || "",
          price: 0,
          discountedPrice: 0,
        },
      ],
    });
  };

  const addFaq = () => {
    onChange({
      faqs: [
        ...faqs,
        { id: generateId(), question: "", answer: "" },
      ],
    });
  };

  return (
    <div className="space-y-5">
      <RestaurantPhotoPanel
        coverPhoto={coverPhoto}
        gallery={gallery}
        onCoverChange={onCoverChange}
        onGalleryChange={onGalleryChange}
      />

      {belowPhotos}

      <Section title="Recommended Menu">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            ส่วนลดสูงสุดจากโปรโมชั่น:{" "}
            <span className="font-medium text-[#E8193C]">-{maxMenuDiscount}%</span>
          </p>
          <Button type="button" variant="outline" size="sm" onClick={addMenuRow}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            เพิ่มเมนู
          </Button>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">ข้อความใต้หัวข้อ</Label>
          <Input
            value={menuDisclaimer}
            onChange={(e) => onChange({ menuDisclaimer: e.target.value })}
            className={fieldClass}
          />
        </div>
        <ul className="divide-y divide-border/60 rounded-lg border border-border/60">
          {menu.length === 0 ? (
            <li className="px-3 py-6 text-center text-xs text-muted-foreground">
              ยังไม่มีเมนู — กดเพิ่มเมนู
            </li>
          ) : (
            menu.map((item, i) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:flex-nowrap"
              >
                <Input
                  value={item.name}
                  onChange={(e) => updateMenuItem(i, { name: e.target.value })}
                  placeholder="ชื่อเมนู"
                  className={cn(fieldClass, "min-w-[8rem] flex-1")}
                />
                <Input
                  type="number"
                  value={item.price || ""}
                  onChange={(e) => {
                    const price = Number(e.target.value);
                    const discountedPrice = Math.round(
                      price * (1 - maxMenuDiscount / 100)
                    );
                    updateMenuItem(i, { price, discountedPrice });
                  }}
                  placeholder="ราคาเต็ม"
                  className={cn(fieldClass, "w-24")}
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  ลดแล้ว ฿{item.discountedPrice ?? 0}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() =>
                    onChange({ menu: menu.filter((_, j) => j !== i) })
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))
          )}
        </ul>
      </Section>

      <Section title="About">
        <div className="space-y-1.5">
          <Label className="text-xs">ที่อยู่</Label>
          <Input
            value={address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="99 Kata Rd., Karon, Phuket..."
            className={fieldClass}
          />
          {address ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs text-[#E8193C] hover:underline"
              onClick={() => void navigator.clipboard.writeText(address)}
            >
              <Copy className="h-3 w-3" />
              Copy Address (ตัวอย่างบนหน้าลูกค้า)
            </button>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">รายละเอียด</Label>
          <Textarea
            value={description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={3}
            className="text-sm"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">โทรศัพท์</Label>
            <Input
              value={phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Google Maps embed URL</Label>
            <Input
              value={mapEmbedUrl}
              onChange={(e) => onChange({ mapEmbedUrl: e.target.value })}
              placeholder="https://www.google.com/maps/embed?..."
              className={fieldClass}
            />
          </div>
        </div>
        {mapEmbedUrl ? (
          <iframe
            title="map preview"
            src={mapEmbedUrl}
            className="aspect-video w-full rounded-lg border border-border/60"
          />
        ) : null}
      </Section>

      <Section title="FAQ">
        <div className="flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={addFaq}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            เพิ่มคำถาม
          </Button>
        </div>
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-sm hover:no-underline">
                {faq.question || `คำถาม ${i + 1}`}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pb-3">
                <Input
                  value={faq.question}
                  onChange={(e) => {
                    const next = faqs.map((f, j) =>
                      j === i ? { ...f, question: e.target.value } : f
                    );
                    onChange({ faqs: next });
                  }}
                  placeholder={`เช่น จองออนไลน์ที่ ${shopName} ได้ไหม?`}
                  className={fieldClass}
                />
                <Textarea
                  value={faq.answer}
                  onChange={(e) => {
                    const next = faqs.map((f, j) =>
                      j === i ? { ...f, answer: e.target.value } : f
                    );
                    onChange({ faqs: next });
                  }}
                  placeholder="คำตอบ..."
                  rows={2}
                  className="text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() =>
                    onChange({ faqs: faqs.filter((_, j) => j !== i) })
                  }
                >
                  ลบคำถาม
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </div>
  );
}
