import { useParams } from "react-router-dom";
import { privateAxios } from "@/utils/privateAxios";
import { useQuery } from "@tanstack/react-query";

export const getWorkspaceTasks = async (workspaceId: string) => {
  return privateAxios
    .get(`/task/${workspaceId}`)
    .then((response) => response.data);
};

export function useWorkspaceTasks() {
  const { workspaceId } = useParams();

  return useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: () => getWorkspaceTasks(workspaceId as string),
  });
}
