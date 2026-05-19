"use client";

import { useEffect, useState } from "react";
import {
  getAuthRole,
  getBookingMode,
  setAuthRole,
  setBookingMode,
} from "@/lib/restaurant/storage";
import type { AuthRole, MockBookingMode } from "@/lib/restaurant/types";

export function useMockAuth() {
  const [role, setRole] = useState<AuthRole>(null);
  const [bookingMode, setBookingModeState] = useState<MockBookingMode>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRole(getAuthRole());
    setBookingModeState(getBookingMode());
    setLoaded(true);
  }, []);

  const login = (nextRole: AuthRole, nextMode: MockBookingMode) => {
    setAuthRole(nextRole);
    setBookingMode(nextMode);
    setRole(nextRole);
    setBookingModeState(nextMode);
  };

  const logout = () => {
    setAuthRole(null);
    setBookingMode(null);
    setRole(null);
    setBookingModeState(null);
  };

  return { role, bookingMode, loaded, login, logout };
}
