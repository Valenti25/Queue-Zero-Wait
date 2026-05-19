import { MapPin } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";

export function CustomerMarketHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo className="text-base" />
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          <span className="hidden font-medium sm:inline">ภูเก็ต</span>
        </div>
        <nav className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <ButtonLink variant="ghost" size="sm" href="/login" className="hidden md:inline-flex">
            เข้าสู่ระบบ
          </ButtonLink>
          <ButtonLink size="sm" href="/start">
            สมัครร้าน
          </ButtonLink>
        </nav>
      </div>
      <div className="border-t border-border/40 md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-1.5 px-4 py-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          <span>ภูเก็ต</span>
        </div>
      </div>
    </header>
  );
}
