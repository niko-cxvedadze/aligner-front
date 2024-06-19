import { PropsWithChildren } from "react";
import { Provider as JotaiProvider } from "jotai/react/Provider";

export function GlobalProvider({ children }: PropsWithChildren) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
