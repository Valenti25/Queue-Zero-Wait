"use client";

import { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { BookingConfirmation } from "@/components/customer/shared/booking-confirmation";
import { CustomerDetailsForm } from "@/components/customer/shared/customer-details-form";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import { bookingConfirmedHref, queueTrackingHref } from "@/lib/customer/navigation";
import { DEMO_TIME_SLOTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function RestaurantFlow({ business }: { business: CustomerBusiness }) {
  const t = useT();
  const [mode, setMode] = useState<"reserve" | "waitlist">("reserve");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");
  const [partySize, setPartySize] = useState(2);

  if (step === "confirmed") {
    const href =
      mode === "waitlist" ? queueTrackingHref(business) : bookingConfirmedHref(business);

    return (
      <BookingConfirmation
        title={mode === "waitlist" ? t.booking.onList : t.booking.confirmed}
        description={
          mode === "waitlist"
            ? t.booking.onListDesc
            : t.booking.confirmedDesc.replace("{name}", business.name)
        }
        primaryHref={href}
        primaryLabel={mode === "waitlist" ? t.booking.trackQueue : t.booking.viewBooking}
        onReset={() => setStep("select")}
        resetLabel={t.booking.anotherBooking}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BusinessHeader business={business} />

      <Tabs
        value={mode}
        onValueChange={(v) => {
          setMode(v as "reserve" | "waitlist");
          setStep("select");
          setSelectedSlot(null);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reserve" disabled={business.bookingMode === "waitlist"}>
            {t.booking.reserve}
          </TabsTrigger>
          <TabsTrigger value="waitlist" disabled={business.bookingMode === "appointment"}>
            {t.booking.joinWaitlist}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reserve" className="mt-6 space-y-6">
          {step === "select" ? (
            <>
              <div>
                <Label className="mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t.booking.selectTime}
                </Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {DEMO_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                        !slot.available && "cursor-not-allowed opacity-40",
                        selectedSlot === slot.id
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-border hover:border-brand-300"
                      )}
                    >
                      <Clock className="mx-auto mb-1 h-4 w-4" />
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
              <PartySizePicker value={partySize} onChange={setPartySize} label={t.booking.partySize} />
              <Button
                className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
                disabled={!selectedSlot}
                onClick={() => setStep("details")}
              >
                {t.booking.continue}
              </Button>
            </>
          ) : (
            <CustomerDetailsForm
              summary={`${t.booking.partySize}: ${partySize}`}
              onBack={() => setStep("select")}
              onSubmit={() => setStep("confirmed")}
            />
          )}
        </TabsContent>

        <TabsContent value="waitlist" className="mt-6 space-y-6">
          {step === "select" ? (
            <>
              <Card className="border-brand-200/60 bg-brand-50/30">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.booking.currentWait}</p>
                    <p className="text-2xl font-semibold">~{business.avgWaitMinutes} min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t.booking.partiesWaiting}</p>
                    <p className="text-2xl font-semibold">4</p>
                  </div>
                </CardContent>
              </Card>
              <PartySizePicker value={partySize} onChange={setPartySize} label={t.booking.partySize} />
              <Button
                className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
                onClick={() => setStep("details")}
              >
                {t.booking.joinBtn}
              </Button>
            </>
          ) : (
            <CustomerDetailsForm
              summary={`${t.booking.partySize}: ${partySize}`}
              onBack={() => setStep("select")}
              onSubmit={() => setStep("confirmed")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PartySizePicker({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div>
      <Label className="mb-3 flex items-center gap-2">
        <Users className="h-4 w-4" />
        {label}
      </Label>
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "h-10 w-10 rounded-lg border font-medium",
              value === n
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border hover:bg-muted"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}


