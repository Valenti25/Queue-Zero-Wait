"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Settings, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: Home, match: (p: string) => p === "/dashboard" },
  {
    href: "/dashboard/register",
    label: "สมัครร้าน",
    icon: Plus,
    match: (p: string) => p.startsWith("/dashboard/register"),
  },
  {
    href: "/dashboard#settings",
    label: "Settings",
    icon: Settings,
    match: () => false,
  },
];

export function OwnerSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r bg-card">
      <div className="flex h-14 items-center gap-2 border-b px-4 font-bold text-[#E8193C]">
        <UtensilsCrossed className="h-5 w-5" />
        เจ้าของร้าน
      </div>
      <nav className="space-y-1 p-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
              item.match(pathname) ? "bg-[#E8193C]/10 text-[#E8193C]" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
