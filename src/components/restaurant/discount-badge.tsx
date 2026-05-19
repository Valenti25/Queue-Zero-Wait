import { cn } from "@/lib/utils";

export function DiscountBadge({
  discount,
  size = "md",
  className,
}: {
  discount: number;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-md",
        size === "sm" ? "h-9 w-9 text-[10px]" : "h-12 w-12 text-xs",
        className
      )}
    >
      -{discount}%
    </span>
  );
}
