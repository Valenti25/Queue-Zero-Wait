"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LogOut, Menu, Store } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useT } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { MerchantSidebar } from "@/components/merchant/merchant-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePrimaryOwnerRestaurant } from "@/hooks/use-primary-owner-restaurant";
import { createClient } from "@/lib/supabase/client";
import { getRestaurantStorefrontUrl } from "@/lib/restaurant/utils";

export function DashboardHeader() {
  const t = useT();
  const router = useRouter();
  const { restaurant } = usePrimaryOwnerRestaurant();
  const [storeUrl, setStoreUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurant?.slug) {
      setStoreUrl(null);
      return;
    }
    setStoreUrl(getRestaurantStorefrontUrl(restaurant.slug, "current"));
  }, [restaurant?.slug]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur-md supports-backdrop-filter:bg-background/80 md:px-8">
      <Sheet>
        <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 hover:bg-muted md:hidden">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MerchantSidebar />
        </SheetContent>
      </Sheet>
      <span className="hidden min-w-0 truncate text-sm font-medium text-muted-foreground sm:inline">
        {restaurant?.name ?? "แดชบอร์ด"}
      </span>
      <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
        <LanguageToggle />
        <ThemeToggle />
        {storeUrl ? (
          <ButtonLink
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <Store className="h-3.5 w-3.5 shrink-0" />
            <span>{t.merchant.viewStorePage}</span>
          </ButtonLink>
        ) : (
          <ButtonLink href="/dashboard/register" variant="outline" size="sm" className="gap-1.5">
            <Store className="h-3.5 w-3.5 shrink-0" />
            <span>{t.merchant.viewStorePage}</span>
          </ButtonLink>
        )}
        <ButtonLink href="/home" target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="gap-1.5">
          <Home className="h-3.5 w-3.5 shrink-0" />
          <span>{t.merchant.customerHome}</span>
        </ButtonLink>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleLogout}
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">ออกจากระบบ</span>
        </Button>
      </div>
    </header>
  );
}
