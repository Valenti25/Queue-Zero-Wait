"use client";

import { MerchantAiDashboard } from "@/components/merchant/merchant-ai-dashboard";
import { MerchantStoreBanner } from "@/components/merchant/merchant-store-banner";
import { DashboardStats } from "@/components/merchant/dashboard-stats";
import { QueuePanel } from "@/components/merchant/queue-panel";
import { BookingsTable } from "@/components/merchant/bookings-table";
import { GoogleConnect } from "@/components/merchant/google-connect";
import { useT } from "@/components/providers/locale-provider";

export default function DashboardPage() {
  const t = useT();

  return (
    <div className="space-y-10">
      <MerchantStoreBanner />
      <MerchantAiDashboard />
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            {t.merchant.operationsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.merchant.operationsDesc}</p>
        </div>
        <DashboardStats />
        <QueuePanel />
        <BookingsTable />
        <GoogleConnect />
      </div>
    </div>
  );
}
