"use client";

import {
  RegistrationForm,
  RESTAURANT_STOREFRONT_FORM_ID,
  restaurantFormSubmitLabel,
} from "@/components/owner/registration-form";
import { RestaurantHub } from "@/components/owner/restaurant-hub";
import { Button } from "@/components/ui/button";
import { getOwnerProfile } from "@/lib/restaurant/storage";
import { useEffect, useState } from "react";

/** จัดการร้าน + เพิ่มสาขา (ฟอร์มเต็ม) */
export default function DashboardRestaurantPage() {
  const [multi, setMulti] = useState(false);

  useEffect(() => {
    setMulti(getOwnerProfile().hasMultipleBranches);
  }, []);

  return (
    <div className="space-y-8">
      <RestaurantHub compact />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold">
            {multi ? "เพิ่มสาขา / แก้ไขร้าน" : "ตั้งค่าหน้าร้าน"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            อัปโหลดรูป โปรโมชั่น เมนู — ลูกค้าเห็นที่ลิงก์ /r/[slug]
          </p>
        </div>
        <Button
          type="submit"
          form={RESTAURANT_STOREFRONT_FORM_ID}
          className="h-11 shrink-0 px-6 bg-primary text-primary-foreground hover:bg-primary/90 sm:mt-0.5"
        >
          {restaurantFormSubmitLabel("create")}
        </Button>
      </div>

      <RegistrationForm mode="create" hideSubmit />
    </div>
  );
}
