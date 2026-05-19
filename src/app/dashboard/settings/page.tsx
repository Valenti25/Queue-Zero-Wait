"use client";

import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { GoogleConnect } from "@/components/merchant/google-connect";
import { Card } from "@/components/ui/card";
import { useT } from "@/components/providers/locale-provider";

export default function DashboardSettingsPage() {
  const t = useT();

  return (
    <div className="space-y-8">
      <Card className="max-w-lg space-y-4 border-border/60 bg-card/50 p-6">
        <h2 className="font-display text-lg font-semibold">{t.merchant.settings}</h2>
        <p className="text-sm text-muted-foreground">
          การตั้งค่าทั่วไป — mock (รอระบบ login จริง)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">ภาษา</span>
          <LanguageToggle />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">ธีม</span>
          <ThemeToggle />
        </div>
      </Card>
      <GoogleConnect />
    </div>
  );
}
