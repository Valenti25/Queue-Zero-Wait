"use client";

import { useState } from "react";
import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { BookingConfirmation } from "@/components/customer/shared/booking-confirmation";
import { CustomerDetailsForm } from "@/components/customer/shared/customer-details-form";
import { BANK_SERVICES, type CustomerBusiness } from "@/lib/customer/businesses";
import { queueTrackingHref } from "@/lib/customer/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function BankFlow({ business }: { business: CustomerBusiness }) {
  const t = useT();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");

  const service = BANK_SERVICES.find((s) => s.id === serviceId);

  if (step === "confirmed") {
    return (
      <BookingConfirmation
        title={t.customerFlow.ticketReady}
        description={t.customerFlow.bankConfirmedDesc}
        primaryHref={queueTrackingHref(business, "A-042")}
        primaryLabel={t.customerFlow.viewTicket}
        onReset={() => setStep("select")}
        resetLabel={t.booking.anotherBooking}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BusinessHeader business={business} />

      {step === "select" ? (
        <>
          <div>
            <Label className="mb-3 flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              {t.customerFlow.chooseService}
            </Label>
            <div className="space-y-2">
              {BANK_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  className={cn(
                    "flex w-full flex-col rounded-xl border px-4 py-3 text-left sm:flex-row sm:items-center sm:justify-between",
                    serviceId === s.id
                      ? "border-accent-emerald/50 bg-accent-emerald/10"
                      : "border-border hover:border-border/80"
                  )}
                >
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="mt-1 text-xs text-muted-foreground sm:mt-0">
                    ~{s.estimatedWaitMin} {t.customerFlow.minWait}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
            disabled={!serviceId}
            onClick={() => setStep("details")}
          >
            {t.customerFlow.getTicket}
          </Button>
        </>
      ) : (
        <CustomerDetailsForm
          summary={service?.label}
          onBack={() => setStep("select")}
          onSubmit={() => setStep("confirmed")}
          submitLabel={t.customerFlow.getTicket}
        />
      )}
    </div>
  );
}
