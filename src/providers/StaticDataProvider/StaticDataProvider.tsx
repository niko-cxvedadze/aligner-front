import { privateAxios } from "@/utils/privateAxios";
import { PropsWithChildren, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const getWorkspaces = () => privateAxios.get("/workspace");

export function StaticDataProvider({ children }: PropsWithChildren<any>) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryFn: getWorkspaces,
      queryKey: ["workspaces"],
    });
  }, []);

  return <div>{children}</div>;
}
