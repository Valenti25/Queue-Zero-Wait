"use client";

import { useState } from "react";
import { Scissors, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { BookingConfirmation } from "@/components/customer/shared/booking-confirmation";
import { CustomerDetailsForm } from "@/components/customer/shared/customer-details-form";
import {
  SALON_SERVICES,
  SALON_STYLISTS,
  type CustomerBusiness,
} from "@/lib/customer/businesses";
import { bookingConfirmedHref, queueTrackingHref } from "@/lib/customer/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function SalonFlow({ business }: { business: CustomerBusiness }) {
  const t = useT();
  const [mode, setMode] = useState<"reserve" | "waitlist">("waitlist");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [stylist, setStylist] = useState<string>(SALON_STYLISTS[0]);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");

  const service = SALON_SERVICES.find((s) => s.id === serviceId);

  if (step === "confirmed") {
    const href = mode === "waitlist" ? queueTrackingHref(business) : bookingConfirmedHref(business);
    return (
      <BookingConfirmation
        title={mode === "waitlist" ? t.booking.onList : t.booking.confirmed}
        description={
          mode === "waitlist" ? t.customerFlow.salonQueueDesc : t.booking.confirmedDesc.replace("{name}", business.name)
        }
        primaryHref={href}
        primaryLabel={mode === "waitlist" ? t.customerFlow.trackChair : t.booking.viewBooking}
        onReset={() => setStep("select")}
        resetLabel={t.booking.anotherBooking}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BusinessHeader business={business} />

      <Tabs value={mode} onValueChange={(v) => { setMode(v as "reserve" | "waitlist"); setStep("select"); }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reserve">{t.booking.reserve}</TabsTrigger>
          <TabsTrigger value="waitlist">{t.customerFlow.chairQueue}</TabsTrigger>
        </TabsList>

        <TabsContent value={mode} className="mt-6 space-y-6">
          {step === "select" ? (
            <>
              <div>
                <Label className="mb-3 flex items-center gap-2">
                  <Scissors className="h-4 w-4" />
                  {t.customerFlow.chooseService}
                </Label>
                <div className="space-y-2">
                  {SALON_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "flex w-full justify-between rounded-xl border px-4 py-3 text-left text-sm",
                        serviceId === s.id ? "border-accent-violet/60 bg-accent-violet/10" : "border-border"
                      )}
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="text-muted-foreground">{s.priceFrom}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t.customerFlow.chooseStylist}
                </Label>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {SALON_STYLISTS.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setStylist(name)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium",
                        stylist === name
                          ? "border-accent-violet bg-accent-violet/15 text-foreground"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "waitlist" && (
                <Card className="border-accent-violet/25 bg-accent-violet/8">
                  <CardContent className="flex justify-between p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.booking.currentWait}</p>
                      <p className="text-2xl font-semibold">~{business.avgWaitMinutes} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{t.customerFlow.chairsAhead}</p>
                      <p className="text-2xl font-semibold">1</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
                disabled={!serviceId}
                onClick={() => setStep("details")}
              >
                {mode === "waitlist" ? t.booking.joinBtn : t.booking.continue}
              </Button>
            </>
          ) : (
            <CustomerDetailsForm
              summary={[service?.label, stylist].filter(Boolean).join(" · ")}
              onBack={() => setStep("select")}
              onSubmit={() => setStep("confirmed")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
