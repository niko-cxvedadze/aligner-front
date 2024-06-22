import { PropsWithChildren } from "react";
import { StaticDataProvider } from "@/providers/private/StaticDataProvider";

export function PrivateProviders({ children }: PropsWithChildren) {
  return <StaticDataProvider>{children}</StaticDataProvider>;
}
