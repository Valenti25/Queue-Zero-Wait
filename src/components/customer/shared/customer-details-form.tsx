"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/components/providers/locale-provider";

export function CustomerDetailsForm({
  summary,
  onBack,
  onSubmit,
  submitLabel,
}: {
  summary?: string;
  onBack: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  const t = useT();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t.booking.yourName}</Label>
        <Input id="name" placeholder="Jane Smith" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t.booking.phone}</Label>
        <Input id="phone" type="tel" placeholder="+66 81 234 5678" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t.booking.email}</Label>
        <Input id="email" type="email" placeholder="jane@email.com" />
      </div>
      {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" type="button" onClick={onBack}>
          {t.common.back}
        </Button>
        <Button
          type="button"
          className="flex-1 border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
          onClick={onSubmit}
        >
          {submitLabel ?? t.common.confirm}
        </Button>
      </div>
    </div>
  );
}

