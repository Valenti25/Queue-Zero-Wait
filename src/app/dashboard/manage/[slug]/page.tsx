import { ManageRestaurantView } from "@/components/owner/manage-restaurant-view";

export default async function ManagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ManageRestaurantView slug={slug} />;
}
