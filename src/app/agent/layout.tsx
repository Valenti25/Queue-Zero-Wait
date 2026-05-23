import type { ReactNode } from "react";

export const metadata = {
  title: "Agent Dashboard",
};

export default function AgentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
