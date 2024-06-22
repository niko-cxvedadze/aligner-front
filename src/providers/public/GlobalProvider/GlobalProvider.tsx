import { PropsWithChildren } from "react";
import { Provider as JotaiProvider } from "jotai";

import { globalStore } from "./GlobalStore.ts";

export function GlobalProvider({ children }: PropsWithChildren) {
  return <JotaiProvider store={globalStore}>{children}</JotaiProvider>;
}
