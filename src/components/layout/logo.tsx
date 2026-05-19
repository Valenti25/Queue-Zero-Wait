import Link from "next/link";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-display font-semibold tracking-tight", className)}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand-br text-primary-foreground shadow-lg shadow-brand-500/25">
        <Timer className="h-5 w-5" strokeWidth={2.25} />
      </span>
      {showText && (
        <span className="text-foreground">
          Queue<span className="text-gradient">-Zero</span>-Wait
        </span>
      )}
    </Link>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand-br text-primary-foreground",
        className
      )}
    >
      <Timer className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}
