import { cn } from "@/lib/utils";

type LayoutMode = "public" | "editor";

/** ซ้าย 60% · ขวา 40% */
const gridCols = "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]";

const gridByMode: Record<LayoutMode, string> = {
  public: gridCols,
  editor: gridCols,
};

const maxWByMode: Record<LayoutMode, string> = {
  public: "max-w-7xl",
  editor: "max-w-7xl",
};

/** top = ใต้ header ที่ sticky แล้ว */
const sidebarStickyByMode: Record<LayoutMode, string> = {
  public: "lg:sticky lg:top-[4.75rem] lg:z-10 lg:self-start",
  editor: "lg:sticky lg:top-20 lg:z-10 lg:self-start",
};

/** เลย์เอาต์ 2 คอลัมน์แบบ Eatigo + sticky ขวา */
export function RestaurantStorefrontLayout({
  gallery,
  sidebar,
  children,
  className,
  mode = "public",
}: {
  gallery?: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  mode?: LayoutMode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWByMode[mode],
        "grid grid-cols-1 items-start gap-6 lg:gap-8",
        gridByMode[mode],
        className
      )}
    >
      <div className="min-w-0 space-y-5">
        {gallery}
        {children}
      </div>
      <aside className={cn("w-full", sidebarStickyByMode[mode])}>
        <div className={cn(mode === "editor" && "lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto")}>
          {sidebar}
        </div>
      </aside>
    </div>
  );
}
