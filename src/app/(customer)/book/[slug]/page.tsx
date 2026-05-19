import { CustomerBookingRouter } from "@/components/customer/customer-booking-router";
import { BookNotFound } from "@/components/customer/book-not-found";
import { OptionalActionsPanel } from "@/components/customer/shared/optional-actions-panel";
import { CustomerHeader } from "@/components/layout/customer-header";
import { getCustomerBusiness } from "@/lib/customer/businesses";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getCustomerBusiness(slug);

  if (!business) {
    return (
      <div className="min-h-screen gradient-mesh">
        <CustomerHeader />
        <main className="mx-auto max-w-lg px-4 py-8">
          <BookNotFound slug={slug} />
        </main>
      </div>
    );
  }

  const showOptional =
    business.flowKind === "restaurant" ||
    business.flowKind === "salon" ||
    business.bookingMode !== "appointment";

  return (
    <div className="min-h-screen gradient-mesh">
      <CustomerHeader />
      <main className="mx-auto max-w-lg px-4 py-8">
        <CustomerBookingRouter business={business} />
        {showOptional && (
          <div className="mt-8">
            <OptionalActionsPanel />
          </div>
        )}
      </main>
    </div>
  );
}
