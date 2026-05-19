"use client";

import { QueuePanel } from "@/components/merchant/queue-panel";
import { BookingsTable } from "@/components/merchant/bookings-table";
import { useT } from "@/components/providers/locale-provider";

/** คิว + การจอง อยู่หน้าเดียวกัน */
export default function DashboardOperationsPage() {
  const t = useT();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {t.merchant.operationsTitle}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.merchant.operationsDesc}</p>
      </div>
      <QueuePanel />
      <BookingsTable />
    </div>
  );
}
