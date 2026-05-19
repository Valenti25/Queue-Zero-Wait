"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { BUSINESS_TYPES } from "@/lib/restaurant/constants";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  triggerClassName?: string;
};

export function BusinessTypePicker({
  value,
  onChange,
  id = "business-type",
  className,
  triggerClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = BUSINESS_TYPES.find((b) => b.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BUSINESS_TYPES;
    return BUSINESS_TYPES.filter(
      (b) => b.label.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 0);
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id: string) => {
    onChange(id);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background/80 px-3 text-left text-sm",
          "transition-colors hover:bg-muted/40",
          "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          open && "border-ring ring-2 ring-ring/30",
          triggerClassName
        )}
      >
        <span className={cn("truncate", !selected && "text-muted-foreground")}>
          {selected?.label ?? "เลือกประเภทกิจการ"}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-lg border border-border/80 bg-popover text-popover-foreground shadow-lg"
        >
          <div className="border-b border-border/60 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหา เช่น คลินิก ร้านอาหาร..."
                className="h-8 w-full rounded-md border border-input bg-background py-1 pl-8 pr-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    e.preventDefault();
                    pick(filtered[0].id);
                  }
                }}
              />
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-center text-xs text-muted-foreground">
                ไม่พบประเภทที่ค้นหา
              </li>
            ) : (
              filtered.map((b) => {
                const active = b.id === value;
                return (
                  <li key={b.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => pick(b.id)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm",
                        active
                          ? "bg-brand-500/12 text-foreground"
                          : "hover:bg-muted/60"
                      )}
                    >
                      <span className="truncate">{b.label}</span>
                      {active ? (
                        <Check className="size-3.5 shrink-0 text-brand-500" />
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
