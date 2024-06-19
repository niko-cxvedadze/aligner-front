import { PropsWithChildren } from "react";
import { createStore, Provider as JotaiProvider, atom } from "jotai";

export const globalStore = createStore();
export const token = atom<string | null>("kvernebi");

// initial atoms
// globalStore.set(token, "");

export function GlobalProvider({ children }: PropsWithChildren) {
  return <JotaiProvider store={globalStore}>{children}</JotaiProvider>;
}
