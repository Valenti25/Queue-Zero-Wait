"use client";

import { useState } from "react";
import { Crown, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { PricingTier } from "@/types";

interface PricingModalProps {
  open: boolean;
  onSelect: (tier: PricingTier) => void;
}

export function PricingModal({ open, onSelect }: PricingModalProps) {
  const [loading, setLoading] = useState<PricingTier | null>(null);

  const handleSelect = (tier: PricingTier) => {
    setLoading(tier);
    setTimeout(() => {
      setLoading(null);
      onSelect(tier);
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-full max-w-sm rounded-t-2xl sm:rounded-2xl bg-card border border-border/60 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-base font-semibold text-foreground mb-1">เลือกแพ็กเกจ</h2>
            <p className="text-xs text-muted-foreground mb-5">
              ยืนยันการจองและรับเลขคิวทันที
            </p>

            <div className="space-y-3">
              {/* Premium */}
              <button
                type="button"
                onClick={() => handleSelect("premium")}
                disabled={loading !== null}
                className="w-full rounded-xl border-2 border-brand-500/40 bg-brand-500/5 hover:border-brand-500/70 hover:bg-brand-500/10 p-4 text-left transition-colors disabled:opacity-60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
                      <Crown className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Premium</p>
                      <p className="text-xs text-muted-foreground">จองได้ไม่จำกัด ทุกบริการ</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-brand-500">29฿</p>
                    <p className="text-[10px] text-muted-foreground">/เดือน</p>
                  </div>
                </div>
                {loading === "premium" && (
                  <p className="mt-2 text-xs text-brand-500 text-center">กำลังโหลด...</p>
                )}
              </button>

              {/* Single */}
              <button
                type="button"
                onClick={() => handleSelect("single")}
                disabled={loading !== null}
                className="w-full rounded-xl border border-border/70 bg-card/60 hover:border-border hover:bg-card/90 p-4 text-left transition-colors disabled:opacity-60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">จ่ายครั้งเดียว</p>
                      <p className="text-xs text-muted-foreground">สำหรับการจองนี้เท่านั้น</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-foreground">10฿</p>
                    <p className="text-[10px] text-muted-foreground">/ครั้ง</p>
                  </div>
                </div>
                {loading === "single" && (
                  <p className="mt-2 text-xs text-muted-foreground text-center">กำลังโหลด...</p>
                )}
              </button>
            </div>

            {/* Empathy free option */}
            <div className="mt-5 flex items-center gap-2 before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
              <span className="text-[11px] text-muted-foreground/60 px-1">หรือ</span>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                เราเข้าใจว่าช่วงนี้คุณลำบาก
                <br />
                คุณสามารถใช้งานฟรีได้เลย
              </p>
              <button
                type="button"
                onClick={() => handleSelect("free")}
                disabled={loading !== null}
                className="text-xs text-muted-foreground/70 hover:text-muted-foreground underline-offset-2 hover:underline transition-colors disabled:opacity-40"
              >
                {loading === "free" ? "กำลังโหลด..." : "ใช้งานฟรี"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
