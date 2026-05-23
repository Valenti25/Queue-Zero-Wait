import { createClient } from "./client";
import type { Booking } from "@/types";
import { generateId } from "@/lib/restaurant/utils";

export async function createBooking(
  params: Omit<Booking, "id" | "status">
): Promise<{ id: string } | null> {
  const supabase = createClient();
  const id = generateId();
  const { error } = await supabase.from("bookings").insert({
    id,
    business_id: params.businessId,
    customer_name: params.customerName,
    customer_email: params.customerEmail,
    date: params.date,
    time: params.time,
    party_size: params.partySize,
    status: "confirmed",
    notes: params.notes ?? null,
  });
  if (error) return null;
  return { id };
}

export async function getBookingsByRestaurant(restaurantId: string): Promise<Booking[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("business_id", restaurantId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    businessId: row.business_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    date: row.date,
    time: row.time,
    partySize: row.party_size,
    status: row.status,
    pricingTier: row.pricing_tier ?? undefined,
    notes: row.notes ?? undefined,
  }));
}
