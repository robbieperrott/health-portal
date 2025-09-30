"use client";

import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
