import { notFound } from "next/navigation";

export const metadata = { title: "ติดตามคิวของคุณ" };
import { CustomerQueueRouter } from "@/components/customer/customer-queue-router";
import { CustomerHeader } from "@/components/layout/customer-header";
import { getCustomerBusiness } from "@/lib/customer/businesses";

export default async function QueuePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ business?: string }>;
}) {
  const { id } = await params;
  const { business: businessSlug } = await searchParams;
  const business = getCustomerBusiness(businessSlug ?? "harbor-bistro");

  if (!business) {
    notFound();
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <CustomerHeader backHref={`/book/${business.slug}`} />
      <main className="mx-auto max-w-lg px-4 py-8">
        <CustomerQueueRouter business={business} ticketId={id} />
      </main>
    </div>
  );
}
