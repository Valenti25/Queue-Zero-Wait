"use client";

import Link from "next/link";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { useT } from "@/components/providers/locale-provider";

export function BookingConfirmedView({ business }: { business: CustomerBusiness }) {
  const t = useT();

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/80 text-center glow-card">
        <CardHeader>
          <CheckCircle2 className="mx-auto h-14 w-14 text-accent-emerald" />
          <CardTitle className="font-display text-2xl">
            {t.customerFlow.appointmentConfirmed}
          </CardTitle>
          <CardDescription>
            {t.customerFlow.appointmentConfirmedDesc.replace("{name}", business.name)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full gap-2" type="button">
            <Calendar className="h-4 w-4" />
            {t.customerFlow.addToCalendar}
          </Button>
          <ButtonLink
            href={`/book/${business.slug}`}
            className="w-full border-0 bg-gradient-brand text-primary-foreground"
          >
            {t.booking.anotherBooking}
          </ButtonLink>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="text-brand-600 hover:underline">
          {t.common.poweredBy}
        </Link>
      </p>
    </div>
  );
}
