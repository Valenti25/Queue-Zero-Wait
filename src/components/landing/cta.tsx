"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Section } from "@/components/shared/section";
import { ButtonLink } from "@/components/ui/button-link";
import { useT } from "@/components/providers/locale-provider";
import { marketingBodyClass, marketingTitleClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CTA() {
  const t = useT();

  return (
    <Section className="pb-32">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand-br px-8 py-16 text-center text-primary-foreground shadow-2xl glow-cyan md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 40%)",
            }}
          />
          <div className="relative">
            <h2 className={marketingTitleClass}>{t.cta.title}</h2>
            <p className={cn("mx-auto mt-3 max-w-xl opacity-90", marketingBodyClass)}>
              {t.cta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink
                href="/start"
                size="lg"
                className="h-12 rounded-full bg-background text-foreground hover:bg-background/90 px-8 border-0"
              >
                {t.common.startTrial}
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/book/harbor-bistro"
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 px-8"
              >
                {t.common.viewDemo}
              </ButtonLink>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
