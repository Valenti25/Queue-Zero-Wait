"use client";

import { Menu } from "lucide-react";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";
import { MerchantSidebar } from "@/components/merchant/merchant-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useT } from "@/components/providers/locale-provider";

export function DashboardHeader() {
  const t = useT();

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border/60 bg-card/50 px-4 md:px-8">
      <Sheet>
        <SheetTrigger className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-border/60 hover:bg-muted">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MerchantSidebar />
        </SheetContent>
      </Sheet>
      <span className="hidden text-sm text-muted-foreground sm:inline font-medium">
        Harbor Bistro
      </span>
      <div className="flex items-center gap-2 ml-auto">
        <LanguageToggle />
        <ThemeToggle />
        <ButtonLink href="/book/harbor-bistro" target="_blank" variant="outline" size="sm">
          {t.merchant.previewCustomer}
        </ButtonLink>
      </div>
    </header>
  );
}
