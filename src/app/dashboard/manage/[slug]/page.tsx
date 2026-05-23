import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ManageRestaurantView } from "@/components/owner/manage-restaurant-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("restaurants")
    .select("name")
    .eq("slug", slug)
    .single();
  return { title: data?.name ? `แก้ไข — ${data.name}` : "แก้ไขร้าน" };
}

export default async function ManagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ManageRestaurantView slug={slug} />;
}
