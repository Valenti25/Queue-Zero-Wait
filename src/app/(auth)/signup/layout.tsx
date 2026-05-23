import type { Metadata } from "next";

export const metadata: Metadata = { title: "สมัครใช้งานฟรี" };

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
