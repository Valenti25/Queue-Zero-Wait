import Link from "next/link";
import { Store } from "lucide-react";

export function OwnerPortalFab() {
  return (
    <Link
      href="/start"
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full bg-[#E8193C] px-4 py-2 text-sm font-semibold text-white shadow-lg"
    >
      <Store className="h-4 w-4" />
      Owner Portal
    </Link>
  );
}
