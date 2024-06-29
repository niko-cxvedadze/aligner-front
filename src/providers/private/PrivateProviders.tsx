import { PropsWithChildren } from "react";

import { ModalsProvider } from "@/providers/private/ModalsProvider";
import { StaticDataProvider } from "@/providers/private/StaticDataProvider";

export function PrivateProviders({ children }: PropsWithChildren) {
  return (
    <StaticDataProvider>
      <ModalsProvider>{children}</ModalsProvider>
    </StaticDataProvider>
  );
}
