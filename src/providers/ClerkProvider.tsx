import { dark } from "@clerk/themes";
import { PropsWithChildren } from "react";
import { ClerkProvider as ClerkOriginalProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export function ClerkProvider({ children }: PropsWithChildren) {
  return (
    <ClerkOriginalProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: [dark] }}
    >
      {children}
    </ClerkOriginalProvider>
  );
}
