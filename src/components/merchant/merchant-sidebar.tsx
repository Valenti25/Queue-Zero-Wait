"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  CalendarDays,
  Clock,
  History,
  LayoutDashboard,
  MapPinned,
  Scissors,
  Settings,
  Star,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { useT } from "@/components/providers/locale-provider";
import { usePrimaryOwnerRestaurant } from "@/hooks/use-primary-owner-restaurant";
import { getRestaurantBusinessType } from "@/lib/restaurant/utils";
import { cn } from "@/lib/utils";

type BusinessKind = "restaurant" | "salon" | "queue-agent" | "other";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  matchPaths?: string[];
}

function getNav(kind: BusinessKind): NavItem[] {
  const base: NavItem[] = [
    { href: "/dashboard", label: "ภาพรวม", icon: LayoutDashboard, exact: true },
  ];

  if (kind === "salon") {
    return [
      ...base,
      { href: "/dashboard/operations", label: "นัดหมาย", icon: CalendarDays },
      {
        href: "/dashboard/restaurant",
        label: "ช่าง & บริการ",
        icon: Scissors,
        matchPaths: ["/dashboard/manage", "/dashboard/register"],
      },
      { href: "/dashboard/google", label: "Google Profile", icon: MapPinned },
      { href: "/dashboard/settings", label: "ตั้งค่า", icon: Settings },
    ];
  }

  if (kind === "queue-agent") {
    return [
      ...base,
      { href: "/dashboard/operations", label: "คิวรอดำเนินการ", icon: Zap },
      { href: "/dashboard/bookings", label: "ประวัติ", icon: History },
      { href: "/dashboard/settings", label: "ตั้งค่า", icon: Settings },
    ];
  }

  // restaurant + other
  return [
    ...base,
    {
      href: "/dashboard/operations",
      label: "การจอง & คิว",
      icon: CalendarClock,
    },
    {
      href: "/dashboard/restaurant",
      label: "หน้าร้าน & สาขา",
      icon: UtensilsCrossed,
      matchPaths: ["/dashboard/manage", "/dashboard/register"],
    },
    { href: "/dashboard/google", label: "Google Profile", icon: MapPinned },
    { href: "/dashboard/settings", label: "ตั้งค่า", icon: Settings },
  ];
}

function getAccent(kind: BusinessKind) {
  if (kind === "salon") return { active: "bg-rose-500/10 text-rose-500", text: "text-rose-500" };
  if (kind === "queue-agent") return { active: "bg-brand-500/10 text-brand-500", text: "text-brand-500" };
  return { active: "bg-amber-500/10 text-amber-500", text: "text-amber-500" };
}

function getKindIcon(kind: BusinessKind) {
  if (kind === "salon") return Scissors;
  if (kind === "queue-agent") return Star;
  return UtensilsCrossed;
}

export function MerchantSidebar() {
  const t = useT();
  const pathname = usePathname();
  const { restaurant } = usePrimaryOwnerRestaurant();

  const kind: BusinessKind = restaurant
    ? (getRestaurantBusinessType(restaurant) as BusinessKind)
    : "restaurant";
  const nav = getNav(kind);
  const accent = getAccent(kind);
  const KindIcon = getKindIcon(kind);

  const isActive = (item: NavItem) => {
    if (item.matchPaths?.some((p) => pathname.startsWith(p))) return true;
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <aside className="flex w-full flex-col md:w-64 md:shrink-0 md:border-r md:border-border/60 md:bg-card/50">
      <div className="flex h-16 items-center border-b border-border/60 px-6">
        <Logo />
      </div>

      {/* Business type badge */}
      {restaurant && (
        <div className={cn("mx-4 mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5", {
          "border-amber-500/20 bg-amber-500/5": kind === "restaurant" || kind === "other",
          "border-rose-500/20 bg-rose-500/5": kind === "salon",
          "border-brand-500/20 bg-brand-500/5": kind === "queue-agent",
        })}>
          <KindIcon className={cn("h-4 w-4 shrink-0", accent.text, kind === "queue-agent" && "fill-current")} />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">{restaurant.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {kind === "salon"
                ? "บริการร้านเสริมสวย"
                : kind === "queue-agent"
                  ? "บริการตี๋น้อย · Exclusive"
                  : "บริการร้านอาหาร"}
            </p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item)
                ? accent.active
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
        <div className={cn("rounded-xl border p-4", {
          "border-amber-500/20 bg-amber-500/5": kind === "restaurant" || kind === "other",
          "border-rose-500/20 bg-rose-500/5": kind === "salon",
          "border-brand-500/20 bg-brand-500/5": kind === "queue-agent",
        })}>
          <p className="text-xs font-medium text-muted-foreground">{t.merchant.currentPlan}</p>
          <p className="font-semibold">{t.merchant.growthTrial}</p>
          <p className={cn("mt-1 text-xs", accent.text)}>{t.merchant.daysLeft}</p>
        </div>
      </div>
    </aside>
  );
}
