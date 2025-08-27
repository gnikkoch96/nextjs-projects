"use client";
import { ThemeProvider } from "@emotion/react";
import theme from "@/lib/theme";

export default function ClientThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
