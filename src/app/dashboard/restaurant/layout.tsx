import type { Metadata } from "next";

export const metadata: Metadata = { title: "จัดการร้าน" };

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
