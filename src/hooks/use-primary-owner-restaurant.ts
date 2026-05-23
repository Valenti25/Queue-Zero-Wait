"use client";

import { useCallback, useEffect, useState } from "react";
import { getPrimaryOwnerRestaurant } from "@/lib/restaurant/storage";
import type { Restaurant } from "@/lib/restaurant/types";

export function usePrimaryOwnerRestaurant() {
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    setRestaurant(await getPrimaryOwnerRestaurant());
    setLoaded(true);
  }, []);

  useEffect(() => {
    void refresh();
    const onStorage = () => void refresh();
    const onFocus = () => void refresh();
    const onUpdated = () => void refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    window.addEventListener("qzw-restaurants-updated", onUpdated);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("qzw-restaurants-updated", onUpdated);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh]);

  return { restaurant, loaded, refresh };
}
