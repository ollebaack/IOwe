"use client";

import * as React from "react";
import { ThemeProvider as ShadcnThemeProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ShadcnThemeProvider>) {
  return (
    <ShadcnThemeProvider attribute="class" {...props}>
      {children}
    </ShadcnThemeProvider>
  );
}
