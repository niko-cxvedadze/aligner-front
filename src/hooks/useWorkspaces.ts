import { privateAxios } from "@/utils/privateAxios";
import { TWorkspace } from "@/@types/api.types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getWorkspaces = (): any =>
  privateAxios.get("/workspace").then((response) => response.data);

export const workspacesOptions = queryOptions<TWorkspace[], string>({
  queryKey: ["workspaces"],
  queryFn: getWorkspaces,
  retry: false,
});

export function useWorkspaces() {
  return useQuery(workspacesOptions);
}
