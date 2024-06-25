import { PropsWithChildren } from "react";
import { useWorkspaces } from "@/hooks/useWorkspaces";

export function StaticDataProvider({ children }: PropsWithChildren<any>) {
  useWorkspaces();

  return <div>{children}</div>;
}
