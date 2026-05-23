import type { Metadata } from "next";

export const metadata: Metadata = { title: "แพ็กเกจและราคา" };

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
