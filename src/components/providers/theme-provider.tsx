"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * React 19 warns when next-themes renders an inline <script> in a client component.
 * Theme init runs via ThemeScript in the root layout; this script tag is inert.
 * @see https://github.com/pacocoursey/next-themes/issues/387
 */
const inertScriptProps = { type: "application/json" } as const;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      scriptProps={inertScriptProps}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
