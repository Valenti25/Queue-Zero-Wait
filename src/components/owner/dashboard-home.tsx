"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { getOwnerRestaurants } from "@/lib/restaurant/storage";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";

export function DashboardHome() {
  const [owned, setOwned] = useState<Restaurant[]>([]);
  useEffect(() => { void getOwnerRestaurants().then(setOwned); }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">แดชบอร์ดเจ้าของร้าน</h1>
        <p className="text-muted-foreground">
          สมัครร้าน → ระบบเจนลิงก์ → แก้ไขแล้วลูกค้าเห็นที่ /r/[slug]
        </p>
      </div>

      {owned.length === 0 ? (
        <Card className="flex flex-col items-center gap-4 rounded-2xl p-12 text-center">
          <p className="font-medium">ยังไม่มีร้าน — กรอกประเภทร้านและข้อมูลเพื่อรับลิงก์</p>
          <ButtonLink href="/dashboard/register" className="bg-[#E8193C] text-white">
            <Plus className="mr-2 h-4 w-4" />
            สมัครร้าน
          </ButtonLink>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {owned.map((r) => (
            <Card key={r.id} className="rounded-2xl p-5">
              <h2 className="font-semibold">{r.name}</h2>
              <p className="text-sm text-muted-foreground">
                {getBusinessTypeLabel(getRestaurantBusinessType(r))}
              </p>
              <RestaurantLinks slug={r.slug} />
              <div className="mt-3">
                <ButtonLink href={`/dashboard/manage/${r.slug}`}>จัดการ</ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
