"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  LayoutDashboard,
  Settings,
  UtensilsCrossed,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { useT } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function MerchantSidebar() {
  const t = useT();
  const pathname = usePathname();

  const nav = [
    { href: "/dashboard", label: t.merchant.overview, icon: LayoutDashboard, exact: true },
    { href: "/dashboard/restaurant", label: "หน้าร้าน & สาขา", icon: UtensilsCrossed },
    { href: "/dashboard/operations", label: "คิว & การจอง", icon: CalendarClock },
    { href: "/dashboard/settings", label: t.merchant.settings, icon: Settings },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (href === "/dashboard/restaurant") {
      return (
        pathname === href ||
        pathname.startsWith("/dashboard/manage") ||
        pathname.startsWith("/dashboard/register")
      );
    }
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex w-full flex-col md:w-64 md:shrink-0 md:border-r md:border-border/60 md:bg-card/50">
      <div className="flex h-16 items-center border-b border-border/60 px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href, item.exact)
                ? "bg-accent-cyan/10 text-accent-cyan"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        <Link
          href="/start"
          className="mt-3 flex items-center gap-3 rounded-lg border border-dashed border-[#E8193C]/40 px-3 py-2.5 text-sm font-medium text-[#E8193C] hover:bg-[#E8193C]/5"
        >
          + สมัครร้าน / สาขาใหม่
        </Link>
      </nav>
      <div className="border-t border-border/60 p-4">
        <div className="rounded-xl border border-accent-violet/20 bg-accent-violet/5 p-4">
          <p className="text-xs font-medium text-muted-foreground">{t.merchant.currentPlan}</p>
          <p className="font-semibold">{t.merchant.growthTrial}</p>
          <p className="mt-1 text-xs text-accent-cyan">{t.merchant.daysLeft}</p>
        </div>
      </div>
    </aside>
  );
}
