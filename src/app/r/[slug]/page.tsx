import { PublicRestaurantPage } from "@/components/restaurant/public-restaurant-page";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicRestaurantPage slug={slug} />;
}
