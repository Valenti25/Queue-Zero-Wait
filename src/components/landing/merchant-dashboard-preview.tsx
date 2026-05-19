"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MerchantAiDashboard } from "@/components/merchant/merchant-ai-dashboard";
import { useT } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

/** Narrower render width → higher scale in the frame → more readable text */
const PREVIEW_DESKTOP_WIDTH = 820;
const MAX_PREVIEW_SCALE = 1;

export function MerchantDashboardPreview({ className }: { className?: string }) {
  const t = useT();
  const m = t.merchantValue;

  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.58);
  const [contentHeight, setContentHeight] = useState(900);

  const updateScale = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    setScale(Math.min(scrollEl.clientWidth / PREVIEW_DESKTOP_WIDTH, MAX_PREVIEW_SCALE));
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(scrollEl);
    return () => ro.disconnect();
  }, [updateScale]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setContentHeight(el.offsetHeight);
    });
    ro.observe(el);
    setContentHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  const scaledWidth = PREVIEW_DESKTOP_WIDTH * scale;
  const scaledHeight = contentHeight * scale;

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative h-[28rem] w-full shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-md ring-1 ring-border/40 sm:h-[32rem]"
        aria-label={m.dashboardPreviewAria}
      >
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto overscroll-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
        >
          <div
            className="relative mx-auto"
            style={{ width: scaledWidth, height: scaledHeight }}
          >
            <div
              ref={contentRef}
              className="absolute left-1/2 top-0"
              style={{
                width: PREVIEW_DESKTOP_WIDTH,
                transform: `translateX(-50%) scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              <MerchantAiDashboard previewLayout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
