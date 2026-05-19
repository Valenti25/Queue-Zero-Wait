import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";

const root = join(process.cwd(), "src", "components", "customer");

function w(rel, content) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content, "utf8");
}

w(
  "shared/booking-confirmation.tsx",
  `"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingConfirmation({
  title,
  description,
  primaryHref,
  primaryLabel,
  onReset,
  resetLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <Card className="border-border/60 bg-card/80 text-center glow-card">
      <CardHeader>
        <motion.div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-emerald/15 text-2xl text-accent-emerald">
          ✓
        </motion.div>
        <CardTitle className="font-display text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ButtonLink
          href={primaryHref}
          className="w-full border-0 bg-gradient-brand text-primary-foreground"
        >
          {primaryLabel}
        </ButtonLink>
        <Button variant="outline" className="w-full" type="button" onClick={onReset}>
          {resetLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
`.replaceAll("motion.div", "motion.div").replaceAll("<motion.div", "<div").replaceAll("</motion.div>", "</motion.div>").replaceAll("</motion.div>", "</div>")
);

console.log("partial write - fix manually");
