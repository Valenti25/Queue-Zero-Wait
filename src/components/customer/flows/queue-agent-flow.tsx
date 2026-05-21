"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessHeader } from "@/components/customer/shared/business-header";
import { PricingModal } from "@/components/customer/shared/pricing-modal";
import { queueTrackingHref } from "@/lib/customer/navigation";
import type { CustomerBusiness } from "@/lib/customer/businesses";
import type { PricingTier } from "@/types";
import { TEE_NOI_TIME_SLOTS } from "@/lib/customer/businesses";
import { cn } from "@/lib/utils";

type FlowStep = "storefront" | "time" | "details" | "confirmed";

const ease = [0.22, 1, 0.36, 1] as const;

const MOCK_QUEUE_COUNT = 38;

export function QueueAgentFlow({ business }: { business: CustomerBusiness }) {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>("storefront");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [pricingTier, setPricingTier] = useState<PricingTier | null>(null);

  const handlePricingSelect = (tier: PricingTier) => {
    setPricingTier(tier);
    setShowPricing(false);
    const ticketId = `agent-${Date.now()}`;
    router.push(queueTrackingHref(business, ticketId));
  };

  const handleDetailsSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    setShowPricing(true);
  };

  return (
    <>
      <PricingModal open={showPricing} onSelect={handlePricingSelect} />

      <div className="min-h-screen bg-background">
        <BusinessHeader business={business} />

        <div className="mx-auto max-w-sm px-4 py-6">
          <AnimatePresence mode="wait" initial={false}>
            {step === "storefront" && (
              <StorefrontStep
                key="storefront"
                business={business}
                onContinue={() => setStep("time")}
              />
            )}
            {step === "time" && (
              <TimeStep
                key="time"
                selectedSlot={selectedSlot}
                onSelect={(id, time) => {
                  setSelectedSlot(id);
                  setSelectedTime(time);
                }}
                onBack={() => setStep("storefront")}
                onContinue={() => setStep("details")}
              />
            )}
            {step === "details" && (
              <DetailsStep
                key="details"
                selectedTime={selectedTime}
                name={name}
                phone={phone}
                onNameChange={setName}
                onPhoneChange={setPhone}
                onBack={() => setStep("time")}
                onSubmit={handleDetailsSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function StorefrontStep({
  business,
  onContinue,
}: {
  business: CustomerBusiness;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease }}
      className="space-y-4"
    >
      {/* Hero image */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl">🍜</span>
        </div>
        {/* Exclusive badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-gradient-brand px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-md">
          <Star className="h-3 w-3 fill-current" />
          Exclusive
        </div>
      </div>

      {/* Info */}
      <div>
        <h1 className="text-xl font-bold text-foreground">{business.name}</h1>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{business.address}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {business.description}
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-border/50 bg-card/60 p-4">
        <p className="text-xs font-semibold text-foreground mb-3">วิธีการทำงาน</p>
        <ul className="space-y-2.5">
          {[
            { icon: Clock, text: "เลือกเวลาที่อยากไปกิน" },
            { icon: Users, text: "ทีมเราไปกดบัตรคิวที่ร้านให้คุณ" },
            { icon: ShieldCheck, text: "รับเลขคิว — ไปถึงร้านได้เลย" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-xs text-foreground/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-cyan/10">
                <Icon className="h-3.5 w-3.5 text-accent-cyan" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Live queue count */}
      <div className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
          </span>
          คนที่จองวันนี้
        </div>
        <span className="text-sm font-bold tabular-nums text-foreground">{MOCK_QUEUE_COUNT} คน</span>
      </div>

      <Button
        onClick={onContinue}
        className="w-full rounded-full bg-gradient-brand text-primary-foreground hover:opacity-90 h-11"
      >
        เลือกเวลา
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}

function TimeStep({
  selectedSlot,
  onSelect,
  onBack,
  onContinue,
}: {
  selectedSlot: string | null;
  onSelect: (id: string, time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease }}
      className="space-y-4"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← ย้อนกลับ
        </button>
        <h2 className="text-lg font-bold text-foreground">เลือกเวลา</h2>
        <p className="text-xs text-muted-foreground mt-0.5">วันนี้ — ทีมเราจะไปกดบัตรตามเวลาที่เลือก</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {TEE_NOI_TIME_SLOTS.map((slot) => {
          const active = selectedSlot === slot.id;
          return (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.available}
              onClick={() => onSelect(slot.id, slot.time)}
              className={cn(
                "rounded-xl border px-4 py-3.5 text-sm font-medium transition-colors",
                !slot.available && "opacity-40 cursor-not-allowed border-border/30 text-muted-foreground",
                slot.available && active && "border-transparent bg-accent-cyan/15 text-accent-cyan ring-1 ring-accent-cyan/40",
                slot.available && !active && "border-border/60 bg-card/60 text-foreground hover:border-border hover:bg-card"
              )}
            >
              <span className="block text-base font-bold">{slot.time}</span>
              <span className="block text-[10px] mt-0.5 font-normal">
                {slot.available ? "ว่าง" : "เต็ม"}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={!selectedSlot}
        className="w-full rounded-full bg-gradient-brand text-primary-foreground hover:opacity-90 h-11 disabled:opacity-40"
      >
        ถัดไป
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}

function DetailsStep({
  selectedTime,
  name,
  phone,
  onNameChange,
  onPhoneChange,
  onBack,
  onSubmit,
}: {
  selectedTime: string;
  name: string;
  phone: string;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const valid = name.trim().length > 0 && phone.trim().length >= 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease }}
      className="space-y-4"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← ย้อนกลับ
        </button>
        <h2 className="text-lg font-bold text-foreground">ข้อมูลติดต่อ</h2>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded-full bg-accent-cyan/10 px-2.5 py-0.5 text-xs font-medium text-accent-cyan">
            {selectedTime} น.
          </span>
          <span className="text-xs text-muted-foreground">ทีมเราจะไปกดบัตรตามเวลานี้</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">ชื่อ</label>
          <Input
            placeholder="ชื่อ-นามสกุล"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            เบอร์โทร
            <span className="ml-1 text-muted-foreground font-normal">(แจ้งเตือนเมื่อได้เลขคิว)</span>
          </label>
          <Input
            type="tel"
            placeholder="08X-XXX-XXXX"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-border/40 bg-muted/20 p-3.5 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">ร้าน</span>
          <span className="font-medium text-foreground">ตี๋น้อย คลอง 6</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">เวลา</span>
          <span className="font-medium text-foreground">{selectedTime} น.</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">บริการ</span>
          <span className="font-medium text-accent-cyan">กดบัตรคิวแทน</span>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={!valid}
        className="w-full rounded-full bg-gradient-brand text-primary-foreground hover:opacity-90 h-11 disabled:opacity-40"
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        ยืนยันการจอง
      </Button>
    </motion.div>
  );
}
