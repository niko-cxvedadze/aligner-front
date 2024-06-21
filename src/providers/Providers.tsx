import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { ClerkProvider } from "./ClerkProvider";
import { ThemeProvider } from "./ThemeProvider";
import { StaticDataProvider } from "./StaticDataProvider";
import { GlobalProvider } from "./GlobalProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <ClerkProvider>
          <AuthProvider>
            <StaticDataProvider>{children}</StaticDataProvider>
          </AuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
}
