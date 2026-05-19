"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/shared/section";
import { useT } from "@/components/providers/locale-provider";
import { marketingBodyClass, marketingTitleClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const DEFAULT_OPEN_COUNT = 3;

const FAQ_DIVIDER = "h-px w-full shrink-0 bg-border/60";

export function FAQ() {
  const t = useT();

  const defaultOpen = useMemo(
    () => t.faq.items.slice(0, DEFAULT_OPEN_COUNT).map((_, i) => `faq-${i}`),
    [t.faq.items]
  );

  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  return (
    <Section id="faq" className="py-10 md:py-14">
      <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
        <h2 className={marketingTitleClass}>
          {t.faq.titleBefore}
          <span className="text-brand-500">{t.faq.titleHighlight}</span>
        </h2>
        <p className={cn("mt-2", marketingBodyClass)}>{t.faq.description}</p>
      </div>

      <Accordion
        multiple
        value={openItems}
        onValueChange={(value) => setOpenItems(value as string[])}
        className="w-full"
      >
        {t.faq.items.map((item, index) => {
          const value = `faq-${index}`;
          const isOpen = openItems.includes(value);

          return (
            <AccordionItem key={item.question} value={value} className="border-0">
              <AccordionTrigger
                className={cn(
                  "w-full gap-2.5 py-3 text-white hover:no-underline sm:gap-3",
                  "hover:text-white focus-visible:text-white",
                  "[&_[data-slot=accordion-trigger-icon]]:hidden"
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-transparent text-white">
                  {isOpen ? (
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </span>
                <span
                  className={cn(
                    "flex-1 text-left text-xs font-medium sm:text-sm",
                    isOpen ? "faq-title-gradient" : "text-white"
                  )}
                >
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-3 pl-9 sm:pb-4 sm:pl-10">
                <p className="text-xs leading-relaxed text-white sm:text-sm">{item.answer}</p>
              </AccordionContent>
              {index < t.faq.items.length - 1 && <div className={FAQ_DIVIDER} aria-hidden />}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Section>
  );
}
