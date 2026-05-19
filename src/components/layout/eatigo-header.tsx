import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export function EatigoHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-2 font-bold text-[#E8193C]">
          <UtensilsCrossed className="h-6 w-6" />
          QueueZero
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <ButtonLink variant="ghost" size="sm" href="/">
            แลนดิ้ง
          </ButtonLink>
          <ButtonLink variant="ghost" size="sm" href="/home">
            ร้านพาร์ทเนอร์
          </ButtonLink>
          <ButtonLink size="sm" className="bg-[#E8193C] text-white" href="/start">
            สมัครร้าน
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
