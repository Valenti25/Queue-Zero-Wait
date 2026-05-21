import { Link2, Share2, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import type { Restaurant } from "@/lib/restaurant/types";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";

export function FacebookSetupGuide({ restaurant }: { restaurant: Restaurant }) {
  const businessType = getRestaurantBusinessType(restaurant);
  const typeLabel = getBusinessTypeLabel(businessType);
  const isQueueAgent = businessType === "queue-agent";

  return (
    <Card className="border-[#E8193C]/20 bg-gradient-to-br from-[#E8193C]/5 to-transparent p-5">
      <div className="flex gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isQueueAgent ? "bg-brand-500/10 text-brand-500" : "bg-[#1877F2]/10 text-[#1877F2]"}`}>
          {isQueueAgent ? <Star className="h-5 w-5 fill-current" /> : <Share2 className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">ตั้งค่าเสร็จแล้ว — ขั้นตอนถัดไป</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            เราสร้างหน้าจอง <strong className="text-foreground">{restaurant.name}</strong> (
            {typeLabel}) ให้แล้ว
          </p>
          {isQueueAgent ? (
            <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
              <li>แชร์ชื่อ <strong className="text-foreground">{restaurant.name}</strong> ลงโซเชียลมีเดีย</li>
              <li>บอกลูกค้าว่าจองได้เฉพาะในแอป QueueZeroWait เท่านั้น</li>
              <li>ลูกค้าเข้าแอป → ค้นหา → จองได้ทันที ไม่ต้องต่อคิว</li>
            </ol>
          ) : (
            <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
              <li>สร้างเพจ Facebook ของร้าน (ถ้ายังไม่มี)</li>
              <li>
                คัดลอกลิงก์จองด้านล่าง ไปใส่ในโพสต์ / ปุ่ม &quot;จองเลย&quot; / About ของเพจ
              </li>
              <li>ลูกค้ากดลิงก์ → เข้าหน้าร้านของคุณจองได้ทันที</li>
            </ol>
          )}
          <RestaurantLinks slug={restaurant.slug} />
          {!isQueueAgent && restaurant.facebookPageUrl && (
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
