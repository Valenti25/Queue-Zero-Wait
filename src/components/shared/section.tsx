import {
  marketingBodyClass,
  marketingEyebrowClass,
  marketingTitleClass,
  siteContainerClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className={cn(siteContainerClass, containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className={cn("mb-2", marketingEyebrowClass)}>{eyebrow}</p>}
      <h2 className={marketingTitleClass}>{title}</h2>
      {description && <p className={cn("mt-3", marketingBodyClass)}>{description}</p>}
    </div>
  );
}
