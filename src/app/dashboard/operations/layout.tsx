import type { Metadata } from "next";

export const metadata: Metadata = { title: "การจอง & คิว" };

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
