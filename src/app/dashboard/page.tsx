"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MerchantStoreBanner } from "@/components/merchant/merchant-store-banner";
import { DashboardStats } from "@/components/merchant/dashboard-stats";
import { MerchantAiDashboard } from "@/components/merchant/merchant-ai-dashboard";
import { RestaurantHub } from "@/components/owner/restaurant-hub";
import { useT } from "@/components/providers/locale-provider";

function DashboardOverviewContent() {
  const t = useT();
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";

  return (
    <div className="space-y-8">
      <MerchantStoreBanner />
      <RestaurantHub showWelcome={welcome} />
      <DashboardStats />
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {t.merchant.insightsNav}
        </h2>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">สรุปยอดจองและคิวล่าสุด</p>
        <MerchantAiDashboard />
      </div>
    </div>
  );
}

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">กำลังโหลด...</p>}>
      <DashboardOverviewContent />
    </Suspense>
  );
}
