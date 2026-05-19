"use client";

import { useState } from "react";
import { Calendar, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { BookingConfirmation } from "@/components/customer/shared/booking-confirmation";
import { CustomerDetailsForm } from "@/components/customer/shared/customer-details-form";
import {
  CLINIC_SERVICES,
  CLINIC_TRIAGE_STAGES,
  type CustomerBusiness,
} from "@/lib/customer/businesses";
import { queueTrackingHref } from "@/lib/customer/navigation";
import { DEMO_TIME_SLOTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function ClinicFlow({ business }: { business: CustomerBusiness }) {
  const t = useT();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");

  const service = CLINIC_SERVICES.find((s) => s.id === serviceId);
  const slot = DEMO_TIME_SLOTS.find((s) => s.id === slotId);

  if (step === "confirmed") {
    return (
      <BookingConfirmation
        title={t.booking.confirmed}
        description={t.customerFlow.clinicConfirmedDesc.replace("{name}", business.name)}
        primaryHref={queueTrackingHref(business)}
        primaryLabel={t.customerFlow.trackTriage}
        onReset={() => setStep("select")}
        resetLabel={t.booking.anotherBooking}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BusinessHeader business={business} />

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">{t.customerFlow.triageTitle}</p>
        <ol className="flex items-center justify-between gap-1">
          {CLINIC_TRIAGE_STAGES.map((label, i) => (
            <li key={label} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                  i === 0
                    ? "bg-accent-cyan/15 text-accent-cyan ring-2 ring-accent-cyan/30"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {i + 1}
              </span>
              <span className="text-center text-[10px] leading-tight text-muted-foreground">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      {step === "select" ? (
        <>
          <div>
            <Label className="mb-3 flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              {t.customerFlow.chooseService}
            </Label>
            <div className="space-y-2">
              {CLINIC_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    serviceId === s.id
                      ? "border-brand-600 bg-brand-50/80"
                      : "border-border hover:border-brand-300"
                  )}
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{s.durationMin} min</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t.booking.selectTime}
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DEMO_TIME_SLOTS.filter((s) => s.available).slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlotId(s.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-sm font-medium",
                    slotId === s.id
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-border hover:border-brand-300"
                  )}
                >
                  {s.time}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
            disabled={!serviceId || !slotId}
            onClick={() => setStep("details")}
          >
            {t.booking.continue}
          </Button>
        </>
      ) : (
        <CustomerDetailsForm
          summary={[service?.label, slot?.time].filter(Boolean).join(" · ")}
          onBack={() => setStep("select")}
          onSubmit={() => setStep("confirmed")}
        />
      )}
    </div>
  );
}

