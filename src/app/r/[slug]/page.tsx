import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PublicRestaurantPage } from "@/components/restaurant/public-restaurant-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("restaurants")
    .select("name, description")
    .eq("slug", slug)
    .single();
  return {
    title: data?.name ?? slug,
    description: data?.description ?? undefined,
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicRestaurantPage slug={slug} />;
}
