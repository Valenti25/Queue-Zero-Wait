"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistrationForm } from "@/components/owner/registration-form";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRestaurantBySlug } from "@/lib/restaurant/storage";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
  getRestaurantStorefrontUrl,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";

export function ManageRestaurantView({ slug }: { slug: string }) {
  const router = useRouter();
  const [r, setR] = useState<Restaurant | null>(null);
  const [storeUrl, setStoreUrl] = useState(() => getRestaurantStorefrontUrl(slug, "local"));

  useEffect(() => setR(getRestaurantBySlug(slug) ?? null), [slug]);
  useEffect(() => {
    setStoreUrl(getRestaurantStorefrontUrl(slug, "current"));
  }, [slug]);

  if (!r) {
    return (
      <Card className="p-8 text-center">
        <p>ไม่พบร้าน</p>
        <ButtonLink className="mt-4" href="/dashboard">
          กลับ
        </ButtonLink>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{r.name}</h1>
          <p className="text-sm text-muted-foreground">
            {getBusinessTypeLabel(getRestaurantBusinessType(r))} · แก้ไขด้านล่าง → ลูกค้าเห็นที่ลิงก์ด้านล่าง
          </p>
        </div>
        <ButtonLink variant="outline" href={storeUrl} target="_blank" rel="noopener noreferrer">
          เปิดหน้าร้าน
        </ButtonLink>
      </div>

      <Tabs defaultValue="links">
        <TabsList>
          <TabsTrigger value="links">ลิงก์</TabsTrigger>
          <TabsTrigger value="edit">แก้ไขข้อมูล</TabsTrigger>
          <TabsTrigger value="reviews">รีวิว</TabsTrigger>
        </TabsList>
        <TabsContent value="links" className="mt-4">
          <RestaurantLinks slug={slug} />
        </TabsContent>
        <TabsContent value="edit" className="mt-4">
          <RegistrationForm initial={r} mode="edit" />
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <Card className="p-4">
            {r.reviews.map((rev) => (
              <div key={rev.id} className="border-b py-2 text-sm last:border-0">
                <strong>{rev.author}</strong> — {rev.comment}
              </div>
            ))}
            {!r.reviews.length && <p className="text-muted-foreground">ยังไม่มีรีวิว</p>}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
