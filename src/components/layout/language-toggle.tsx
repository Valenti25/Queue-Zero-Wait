"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { localeLabels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  const cycle = () => {
    const next: Locale = locale === "en" ? "th" : "en";
    setLocale(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs font-medium",
        "bg-muted/50 hover:bg-muted hover:border-accent-cyan/40 transition-colors",
        className
      )}
      aria-label={t.common.language}
      title={t.common.language}
    >
      <Languages className="h-3.5 w-3.5 text-accent-cyan" />
      <span className="tabular-nums">{localeLabels[locale]}</span>
    </button>
  );
}
