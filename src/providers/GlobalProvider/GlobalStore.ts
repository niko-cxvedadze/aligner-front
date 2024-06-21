import { createStore, atom } from "jotai";

export const globalStore = createStore();
export const authTokenAtom = atom<string | null>(null);

globalStore.set(authTokenAtom, null);
