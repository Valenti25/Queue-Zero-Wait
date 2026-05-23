"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { FacebookSetupGuide } from "@/components/owner/facebook-setup-guide";
import { RestaurantLinks } from "@/components/owner/restaurant-links";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import {
  getOwnerProfile,
  getOwnerRestaurants,
} from "@/lib/restaurant/storage";
import {
  getBusinessTypeLabel,
  getRestaurantBusinessType,
} from "@/lib/restaurant/utils";
import type { Restaurant } from "@/lib/restaurant/types";

interface RestaurantHubProps {
  showWelcome?: boolean;
  compact?: boolean;
}

export function RestaurantHub({ showWelcome, compact }: RestaurantHubProps) {
  const [owned, setOwned] = useState<Restaurant[]>([]);
  const [multiBranch, setMultiBranch] = useState(false);

  useEffect(() => {
    void getOwnerRestaurants().then(setOwned);
    setMultiBranch(getOwnerProfile().hasMultipleBranches);
  }, []);

  if (owned.length === 0) {
    return (
      <Card className="rounded-xl border border-dashed border-border/60 bg-card/50 p-6 text-center">
        <p className="text-muted-foreground">ยังไม่มีร้านในระบบ</p>
        <ButtonLink href="/start" className="mt-4 bg-[#E8193C] text-white">
          สมัครร้านเลย
        </ButtonLink>
      </Card>
    );
  }

  const primary = owned[0];

  return (
    <div className="space-y-6">
      {showWelcome && primary && (
        <FacebookSetupGuide restaurant={primary} />
      )}

      {!compact && (
        <Card className="rounded-xl border border-border/60 bg-card/50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold">
                {primary.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {getBusinessTypeLabel(getRestaurantBusinessType(primary))}
                {multiBranch && owned.length > 1
                  ? ` · ${owned.length} สาขา`
                  : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonLink
                href={`/dashboard/manage/${primary.slug}`}
                variant="outline"
                size="sm"
              >
                แก้ไขข้อมูล
              </ButtonLink>
              <ButtonLink
                href={`/r/${primary.slug}`}
                target="_blank"
                variant="outline"
                size="sm"
              >
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                หน้าลูกค้า
              </ButtonLink>
            </div>
          </div>
          <RestaurantLinks slug={primary.slug} />
        </Card>
      )}

      {multiBranch && owned.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">สาขาทั้งหมด</h3>
            <ButtonLink href="/dashboard/restaurant" size="sm" variant="outline">
              <Plus className="mr-1 h-3.5 w-3.5" />
              เพิ่มสาขา
            </ButtonLink>
          </div>
          <ul className="space-y-2">
            {owned.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/40 px-3 py-2 text-sm"
              >
                <span>
                  {r.name}{" "}
                  <span className="text-muted-foreground">
                    ({getBusinessTypeLabel(getRestaurantBusinessType(r))})
                  </span>
                </span>
                <Link
                  href={`/r/${r.slug}`}
                  className="text-xs text-[#E8193C] hover:underline"
                  target="_blank"
                >
                  เปิดลิงก์
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
