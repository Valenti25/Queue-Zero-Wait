"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/components/providers/locale-provider";
import { getBookingsByRestaurant } from "@/lib/supabase/bookings";
import type { Booking } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  confirmed: "bg-accent-emerald/15 text-accent-emerald border-accent-emerald/30",
  pending: "bg-accent-amber/15 text-accent-amber border-accent-amber/30",
  cancelled: "bg-accent-rose/15 text-accent-rose border-accent-rose/30",
  completed: "bg-muted text-muted-foreground",
  no_show: "bg-accent-rose/15 text-accent-rose border-accent-rose/30",
};

export function BookingsTable({ restaurantId }: { restaurantId: string }) {
  const t = useT();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void getBookingsByRestaurant(restaurantId).then((data) => {
      setBookings(data);
      setLoaded(true);
    });
  }, [restaurantId]);

  return (
    <Card id="bookings" className="border-border/60 bg-card/50 glow-card">
      <CardHeader>
        <CardTitle className="font-display">{t.merchant.upcomingBookings}</CardTitle>
        <CardDescription>{t.merchant.upcomingDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        {!loaded ? (
          <p className="py-4 text-center text-sm text-muted-foreground">กำลังโหลด...</p>
        ) : bookings.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">ยังไม่มีการจอง</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-muted-foreground">
                  <th className="pb-3 font-medium">{t.merchant.customer}</th>
                  <th className="pb-3 font-medium">{t.merchant.date}</th>
                  <th className="pb-3 font-medium">{t.merchant.time}</th>
                  <th className="pb-3 font-medium">{t.merchant.party}</th>
                  <th className="pb-3 font-medium">{t.merchant.status}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/40 last:border-0">
                    <td className="py-3">
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                    </td>
                    <td className="py-3 text-muted-foreground">{booking.date}</td>
                    <td className="py-3">{booking.time}</td>
                    <td className="py-3">{booking.partySize}</td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusStyles[booking.status])}
                      >
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
