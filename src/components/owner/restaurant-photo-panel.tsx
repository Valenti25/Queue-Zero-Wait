"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Star, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fileToDataUrl } from "@/lib/restaurant/utils";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 6;
const PLACEHOLDER =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";

type Props = {
  coverPhoto: string;
  gallery: string[];
  onCoverChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
  className?: string;
};

export function RestaurantPhotoPanel({
  coverPhoto,
  gallery,
  onCoverChange,
  onGalleryChange,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const photos = useMemo(() => {
    const list: string[] = [];
    if (coverPhoto) list.push(coverPhoto);
    for (const url of gallery) {
      if (url && !list.includes(url)) list.push(url);
    }
    return list;
  }, [coverPhoto, gallery]);

  const safeIndex = photos.length ? Math.min(activeIndex, photos.length - 1) : 0;
  const activeUrl = photos[safeIndex] ?? "";

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;

    const urls: string[] = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      urls.push(await fileToDataUrl(file));
    }
    if (!urls.length) return;

    if (!coverPhoto) {
      onCoverChange(urls[0]);
      if (urls.length > 1) onGalleryChange([...gallery, ...urls.slice(1)]);
      setActiveIndex(0);
    } else {
      onGalleryChange([...gallery, ...urls]);
    }
  };

  const setAsCover = (index: number) => {
    const url = photos[index];
    if (!url || index === 0) return;
    const rest = photos.filter((_, i) => i !== index);
    onCoverChange(url);
    onGalleryChange(rest);
    setActiveIndex(0);
  };

  const removePhoto = (index: number) => {
    const url = photos[index];
    if (!url) return;
    if (index === 0) {
      const next = gallery[0];
      if (next) {
        onCoverChange(next);
        onGalleryChange(gallery.slice(1));
      } else {
        onCoverChange("");
        onGalleryChange([]);
      }
    } else {
      onGalleryChange(gallery.filter((g) => g !== url));
    }
    setActiveIndex(0);
  };

  const displayUrl = activeUrl || PLACEHOLDER;
  const isPlaceholder = !activeUrl;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium">รูปร้าน</p>
          <p className="text-xs text-muted-foreground">
            รูปแรก = ปก · สูงสุด {MAX_PHOTOS} รูป
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          disabled={photos.length >= MAX_PHOTOS}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          เพิ่มรูป
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          void addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* Eatigo-style: รูปใหญ่ซ้าย + thumbnail แนวตั้งขวา */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => !photos.length && inputRef.current?.click()}
          className={cn(
            "relative min-h-[240px] flex-1 overflow-hidden rounded-xl border bg-muted/30 lg:min-h-[320px]",
            !photos.length && "cursor-pointer border-dashed border-border hover:border-brand-500/40 hover:bg-muted/50"
          )}
        >
          <Image
            src={displayUrl}
            alt="รูปร้านหลัก"
            fill
            className={cn("object-cover", isPlaceholder && "opacity-40")}
            unoptimized={displayUrl.startsWith("data:")}
          />
          {isPlaceholder ? (
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImagePlus className="h-10 w-10 opacity-60" />
              <span className="text-xs font-medium">คลิกเพื่ออัปโหลดรูปปก</span>
            </span>
          ) : (
            <>
              {safeIndex === 0 && (
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  รูปปก
                </span>
              )}
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(safeIndex);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </button>

        <div className="flex w-[4.5rem] shrink-0 flex-col gap-2 sm:w-20">
          {photos.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all",
                i === safeIndex
                  ? "border-brand-500 ring-2 ring-brand-500/30"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                unoptimized={url.startsWith("data:")}
              />
            </button>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/20 text-muted-foreground transition-colors hover:border-brand-500/40 hover:bg-muted/40"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {photos.length > 1 && (
        <p className="text-center text-[11px] text-muted-foreground">
          คลิกรูปเล็กเพื่อดูตัวอย่าง
          {safeIndex > 0 && (
            <>
              {" · "}
              <button
                type="button"
                className="text-brand-500 hover:underline"
                onClick={() => setAsCover(safeIndex)}
              >
                ใช้รูปนี้เป็นปก
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
}
