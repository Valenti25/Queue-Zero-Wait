"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/layout/logo";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useT } from "@/components/providers/locale-provider";
import { siteContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "ร้านพาร์ทเนอร์" },
    { href: "/#features", label: t.nav.features },
    { href: "/#for-owners", label: t.nav.forOwners },
    { href: "/#how-it-works", label: t.nav.howItWorks },
    { href: "/#industries", label: t.nav.industries },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className={cn(siteContainerClass, "flex h-16 items-center justify-between gap-3")}>
        <Logo />

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-brand-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          <ButtonLink
            href="/start"
            size="sm"
            className="border-0 bg-gradient-brand text-primary-foreground shadow-lg shadow-brand-500/25 hover:opacity-90"
          >
            {t.common.startTrial}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 bg-background md:hidden overflow-hidden transition-all",
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-border pt-4">
            <ButtonLink
              href="/start"
              className="w-full border-0 bg-gradient-brand text-primary-foreground"
            >
              {t.common.startTrial}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
