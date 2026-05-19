"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { getRestaurantStorefrontUrl } from "@/lib/restaurant/utils";

export function RestaurantLinks({ slug }: { slug: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [localUrl, setLocalUrl] = useState(() => getRestaurantStorefrontUrl(slug, "local"));

  useEffect(() => {
    setLocalUrl(getRestaurantStorefrontUrl(slug, "current"));
  }, [slug]);

  const links = [
    { key: "local", label: "Localhost", url: localUrl },
    { key: "live", label: "Vercel", url: getRestaurantStorefrontUrl(slug, "live") },
  ];

  const copy = async (url: string, key: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">ลิงก์หน้าร้าน (ให้ลูกค้ากดจอง)</p>
        <ButtonLink
          href={localUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          className="gap-1.5"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          เปิดหน้าร้าน
        </ButtonLink>
      </div>
      {links.map(({ key, label, url }) => (
        <div key={key} className="flex flex-col gap-1 sm:flex-row sm:items-center">
          <span className="w-20 shrink-0 text-xs text-muted-foreground">{label}</span>
          <code className="flex-1 truncate rounded bg-background px-2 py-1 text-xs">{url}</code>
          <Button type="button" variant="outline" size="sm" onClick={() => copy(url, key)}>
            {copied === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      ))}
    </div>
  );
}
