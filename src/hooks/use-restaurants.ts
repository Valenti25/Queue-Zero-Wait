"use client";

import { useCallback, useEffect, useState } from "react";
import { getRestaurants } from "@/lib/restaurant/storage";
import type { Restaurant } from "@/lib/restaurant/types";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    setRestaurants(await getRestaurants());
    setLoaded(true);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { restaurants, loaded, refresh };
}
