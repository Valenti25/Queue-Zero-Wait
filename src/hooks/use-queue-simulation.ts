"use client";

import { useCallback, useEffect, useState } from "react";

interface QueueState {
  position: number;
  totalAhead: number;
  estimatedWaitMinutes: number;
  status: "waiting" | "called" | "served";
}

const INITIAL: QueueState = {
  position: 12,
  totalAhead: 4,
  estimatedWaitMinutes: 22,
  status: "waiting",
};

export function useQueueSimulation(enabled = true) {
  const [state, setState] = useState<QueueState>(INITIAL);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.status !== "waiting" || prev.totalAhead <= 0) return prev;
      const newAhead = Math.max(0, prev.totalAhead - 1);
      const newPosition = Math.max(1, prev.position - 1);
      const newWait = Math.max(0, prev.estimatedWaitMinutes - 4);
      return {
        position: newPosition,
        totalAhead: newAhead,
        estimatedWaitMinutes: newWait,
        status: newAhead === 0 ? "called" : prev.status,
      };
    });
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(tick, 8000);
    return () => clearInterval(interval);
  }, [enabled, tick]);

  return { ...state, lastUpdate, reset: () => setState(INITIAL) };
}
