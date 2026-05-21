"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialShareProps {
  businessName: string;
  bookingSlug: string;
}

export function SocialShare({ businessName, bookingSlug }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `จอง${businessName} ผ่าน QueueZeroWait ได้แล้ว! ไม่ต้องมาต่อคิวเอง 🎉`;
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/book/${bookingSlug}`
    : `/book/${bookingSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: shareText, url: shareUrl }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-primary-foreground">
          <Share2 className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            แชร์ให้เพื่อนรู้จัก
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
            คุณเป็นคนแรกๆ ที่จอง{businessName} ได้บนแอปนี้ — บอกต่อได้เลย
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border/50 bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {shareText}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleNativeShare}
          className="flex-1 rounded-lg bg-gradient-brand py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          แชร์เลย
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card hover:bg-muted transition-colors"
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-3.5 w-3.5 text-accent-emerald" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
