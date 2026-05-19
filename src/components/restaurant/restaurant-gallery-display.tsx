"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80";

export function RestaurantGalleryDisplay({
  coverPhoto,
  gallery,
  className,
}: {
  coverPhoto: string;
  gallery: string[];
  className?: string;
}) {
  const photos = (() => {
    const list: string[] = [];
    if (coverPhoto) list.push(coverPhoto);
    for (const u of gallery) {
      if (u && !list.includes(u)) list.push(u);
    }
    if (!list.length) list.push(PLACEHOLDER);
    return list;
  })();

  const [active, setActive] = useState(0);
  const url = photos[Math.min(active, photos.length - 1)] ?? PLACEHOLDER;

  return (
    <div className={cn("flex gap-2 sm:gap-3", className)}>
      <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl bg-muted sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px]">
        <Image
          src={url}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
          unoptimized={url.startsWith("data:")}
          priority
        />
        {photos.length > 1 ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {active + 1} / {photos.length}
          </span>
        ) : null}
      </div>
      {photos.length > 1 ? (
        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 sm:w-[5.25rem] lg:w-24">
          {photos.slice(0, 6).map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all",
                i === active
                  ? "border-primary ring-2 ring-primary/25"
                  : "border-transparent opacity-75 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
                unoptimized={src.startsWith("data:")}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
