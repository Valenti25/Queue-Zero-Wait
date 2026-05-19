"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useT } from "@/components/providers/locale-provider";

export function CustomerHeader({
  backHref,
  backLabel,
}: {
  backHref?: string;
  backLabel?: string;
}) {
  const t = useT();

  return (
    <header className="border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between gap-2 px-4">
        <Logo showText={false} />
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          {backHref && (
            <Link
              href={backHref}
              className="ml-1 text-sm text-accent-cyan hover:underline whitespace-nowrap"
            >
              {backLabel ?? t.common.backToBooking}
            </Link>
          )}
          {!backHref && (
            <Link href="/" className="ml-1 text-sm text-muted-foreground hover:text-foreground">
              {t.common.poweredBy}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
