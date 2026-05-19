"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-9 w-9 rounded-full", className)}
        aria-label={t.common.theme}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-9 w-9 rounded-full border border-border/60 hover:bg-muted hover:border-accent-cyan/30",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      title={isDark ? t.common.themeLight : t.common.themeDark}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-accent-amber" />
      ) : (
        <Moon className="h-4 w-4 text-accent-violet" />
      )}
    </Button>
  );
}
