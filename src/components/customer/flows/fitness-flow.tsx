"use client";

import { useState } from "react";
import { Calendar, Dumbbell, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { BookingConfirmation } from "@/components/customer/shared/booking-confirmation";
import { CustomerDetailsForm } from "@/components/customer/shared/customer-details-form";
import { FITNESS_CLASSES, type CustomerBusiness } from "@/lib/customer/businesses";
import { queueTrackingHref } from "@/lib/customer/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

export function FitnessFlow({ business }: { business: CustomerBusiness }) {
  const t = useT();
  const [classId, setClassId] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "details" | "confirmed">("select");

  const fitnessClass = FITNESS_CLASSES.find((c) => c.id === classId);

  if (step === "confirmed") {
    return (
      <BookingConfirmation
        title={t.booking.confirmed}
        description={t.customerFlow.fitnessConfirmedDesc.replace("{name}", fitnessClass?.name ?? "")}
        primaryHref={queueTrackingHref(business)}
        primaryLabel={t.customerFlow.viewClassPass}
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
              <Dumbbell className="h-4 w-4" />
              {t.customerFlow.chooseClass}
            </Label>
            <div className="space-y-2">
              {FITNESS_CLASSES.map((c) => {
                const full = c.spotsLeft <= 0;
                const low = c.spotsLeft <= 3 && !full;
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={full}
                    onClick={() => setClassId(c.id)}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-colors",
                      full && "cursor-not-allowed opacity-50",
                      classId === c.id
                        ? "border-accent-amber/60 bg-accent-amber/10"
                        : "border-border hover:border-accent-amber/40"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-amber/10 text-accent-amber">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{c.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {c.time} · {c.instructor}
                        </p>
                        <p
                          className={cn(
                            "mt-2 flex items-center gap-1 text-xs font-medium",
                            low ? "text-accent-amber" : "text-muted-foreground"
                          )}
                        >
                          <Users className="h-3 w-3" />
                          {t.customerFlow.spotsLeft}: {c.spotsLeft} / {c.spotsTotal}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            className="w-full border-0 bg-gradient-brand text-primary-foreground hover:opacity-90"
            disabled={!classId}
            onClick={() => setStep("details")}
          >
            {t.customerFlow.reserveSpot}
          </Button>
        </>
      ) : (
        <CustomerDetailsForm
          summary={fitnessClass ? `${fitnessClass.name} · ${fitnessClass.time}` : undefined}
          onBack={() => setStep("select")}
          onSubmit={() => setStep("confirmed")}
          submitLabel={t.customerFlow.reserveSpot}
        />
      )}
    </div>
  );
}
