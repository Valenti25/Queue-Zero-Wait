import { Link2, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import type { Restaurant } from "@/lib/restaurant/types";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";

export function FacebookSetupGuide({ restaurant }: { restaurant: Restaurant }) {
  const typeLabel = getBusinessTypeLabel(getRestaurantBusinessType(restaurant));

  return (
    <Card className="border-[#E8193C]/20 bg-gradient-to-br from-[#E8193C]/5 to-transparent p-5">
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2]">
          <Share2 className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">ตั้งค่าเสร็จแล้ว — ขั้นตอนถัดไป</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            เราสร้างหน้าจอง <strong className="text-foreground">{restaurant.name}</strong> (
            {typeLabel}) ให้แล้ว คุณแค่นำลิงก์ไปใช้
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
            <li>สร้างเพจ Facebook ของร้าน (ถ้ายังไม่มี)</li>
            <li>
              คัดลอกลิงก์จองด้านล่าง ไปใส่ในโพสต์ / ปุ่ม &quot;จองเลย&quot; / About ของเพจ
            </li>
            <li>ลูกค้ากดลิงก์ → เข้าหน้าร้านของคุณจองได้ทันที</li>
          </ol>
          <RestaurantLinks slug={restaurant.slug} />
          {restaurant.facebookPageUrl && (
            <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <Link2 className="h-3.5 w-3.5" />
              เพจ FB: {restaurant.facebookPageUrl}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
