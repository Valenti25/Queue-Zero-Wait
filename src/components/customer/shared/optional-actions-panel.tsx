"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_OPTIONAL_ACTIONS } from "@/lib/mock-data";
import { useT } from "@/components/providers/locale-provider";

const ACTION_I18N: Record<string, { label: string; desc: string }> = {
  pre_order: { label: "preOrder", desc: "preOrderDesc" },
  form: { label: "dietary", desc: "dietaryDesc" },
  deposit: { label: "deposit", desc: "depositDesc" },
  confirm: { label: "confirmAttendance", desc: "confirmAttendanceDesc" },
};

export function OptionalActionsPanel() {
  const t = useT();

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">{t.booking.whileWaiting}</CardTitle>
        <CardDescription>{t.booking.optionalActions}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {DEMO_OPTIONAL_ACTIONS.filter((a) => a.enabled).map((action) => {
          const keys = ACTION_I18N[action.type];
          const label = keys
            ? (t.booking[keys.label as keyof typeof t.booking] as string)
            : action.label;
          const desc = keys
            ? (t.booking[keys.desc as keyof typeof t.booking] as string)
            : action.description;

          return (
            <button
              key={action.id}
              type="button"
              className="flex w-full items-start gap-3 rounded-xl border border-border/60 p-4 text-left transition-colors hover:border-brand-200 hover:bg-brand-50/30"
            >
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
