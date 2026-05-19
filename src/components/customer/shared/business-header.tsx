import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LogoIcon } from "@/components/layout/logo";
import { useT } from "@/components/providers/locale-provider";
import type { CustomerBusiness } from "@/lib/customer/businesses";

export function BusinessHeader({ business }: { business: CustomerBusiness }) {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-violet-100 text-3xl">
        {business.icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-brand-500">{business.contextLabel}</p>
        <h1 className="font-display text-2xl font-semibold">{business.name}</h1>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{business.address}</span>
        </p>
        {business.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{business.description}</p>
        )}
        {business.googleBusinessConnected && (
          <Badge
            variant="secondary"
            className="mt-2 gap-1 border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan"
          >
            <LogoIcon className="h-3 w-3" />
            {t.booking.viaGoogle}
          </Badge>
        )}
      </div>
    </div>
  );
}
