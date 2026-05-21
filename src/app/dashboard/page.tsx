"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RestaurantDashboard } from "@/components/dashboard/restaurant-dashboard";
import { SalonDashboard } from "@/components/dashboard/salon-dashboard";
import { QueueAgentDashboard } from "@/components/dashboard/queue-agent-dashboard";
import { FacebookSetupGuide } from "@/components/owner/facebook-setup-guide";
import { usePrimaryOwnerRestaurant } from "@/hooks/use-primary-owner-restaurant";
import { getRestaurantBusinessType } from "@/lib/restaurant/utils";
import { ButtonLink } from "@/components/ui/button-link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

function DashboardContent() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";
  const { restaurant, loaded } = usePrimaryOwnerRestaurant();

  if (!loaded) {
    return <p className="text-muted-foreground">กำลังโหลด...</p>;
  }

  if (!restaurant) {
    return (
      <Card className="flex flex-col items-center gap-4 rounded-2xl p-12 text-center">
        <p className="font-medium">ยังไม่มีร้าน — กรอกประเภทร้านและข้อมูลเพื่อรับลิงก์</p>
        <ButtonLink href="/start" className="bg-[#E8193C] text-white">
          <Plus className="mr-2 h-4 w-4" />
          สมัครร้าน
        </ButtonLink>
      </Card>
    );
  }

  const kind = getRestaurantBusinessType(restaurant);

  return (
    <div className="space-y-6">
      {welcome && <FacebookSetupGuide restaurant={restaurant} />}

      {kind === "salon" ? (
        <SalonDashboard restaurant={restaurant} />
      ) : kind === "queue-agent" ? (
        <QueueAgentDashboard restaurant={restaurant} />
      ) : (
        <RestaurantDashboard restaurant={restaurant} />
      )}
    </div>
  );
}

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">กำลังโหลด...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
