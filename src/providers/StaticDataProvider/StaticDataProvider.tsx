import { TWorkspace } from "@/@types/api.types";
import { privateAxios } from "@/utils/privateAxios";
import { PropsWithChildren, useEffect } from "react";
import { useQueryClient, queryOptions } from "@tanstack/react-query";

export const getWorkspaces = (): any =>
  privateAxios.get("/workspace").then((response) => response.data);

export const workspacesOptions = queryOptions<TWorkspace[], string>({
  queryKey: ["workspaces"],
  queryFn: getWorkspaces,
  networkMode: "offlineFirst",
  staleTime: Infinity,
  retry: false,
});

export function StaticDataProvider({ children }: PropsWithChildren<any>) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(workspacesOptions);
  }, []);

  return <div>{children}</div>;
}
