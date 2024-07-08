import { useParams } from "react-router-dom";
import { privateAxios } from "@/utils/privateAxios";
import { useQuery } from "@tanstack/react-query";

export const getWorkspaceTasks = (workspaceId: string): any =>
  privateAxios.get(`/task/${workspaceId}`).then((response) => response.data);

export function useWorkspaceTasks() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return useQuery<any>({
    queryKey: ["tasks", workspaceId],
    queryFn: () => getWorkspaceTasks(workspaceId as string),
    retry: false,
  });
}
