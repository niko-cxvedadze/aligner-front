import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider.tsx";
import { ClerkProvider } from "./ClerkProvider.tsx";
import { ThemeProvider } from "./ThemeProvider.tsx";
import { GlobalProvider } from "./GlobalProvider";

export function PublicProviders({ children }: PropsWithChildren) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <ClerkProvider>
          <AuthProvider>{children}</AuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
}
