import { MerchantSidebar } from "@/components/merchant/merchant-sidebar";
import { DashboardHeader } from "@/components/merchant/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:flex">
        <MerchantSidebar />
      </div>
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
