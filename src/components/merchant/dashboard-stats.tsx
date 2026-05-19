"use client";

import { Calendar, Clock, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/components/providers/locale-provider";

export function DashboardStats() {
  const t = useT();

  const stats = [
    { label: t.merchant.waitingNow, value: "4", icon: Users, change: "+2" },
    { label: t.merchant.avgWait, value: "18m", icon: Clock, change: "-3m" },
    { label: t.merchant.bookingsToday, value: "12", icon: Calendar, change: "3" },
    { label: t.merchant.noShowRate, value: "4%", icon: TrendingUp, change: "↓1%" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/60 bg-card/50 glow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-accent-cyan" />
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
            <p className="mt-4 text-2xl font-semibold tabular-nums">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
