import { privateAxios } from "@/utils/privateAxios";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

async function fetchTasks({
  workspaceId,
  skip,
  limit,
  statuses = [],
  priorities = [],
}: {
  workspaceId: string;
  skip: number;
  limit: number;
  statuses?: string[];
  priorities?: string[];
}) {
  const statusString = statuses.join(",");
  const priorityString = priorities.join(",");

  return privateAxios
    .get(
      `/task/${workspaceId}?skip=${skip}&limit=${limit}&statuses=${statusString}&priorities=${priorityString}`
    )
    .then((response) => response.data);
}

const fetchSize = 50;

export function useWorkspaceTasksInfinite({
  workspaceId,
}: {
  workspaceId?: string;
}) {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<any>({
    queryKey: ["tasks", workspaceId],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;

      return await fetchTasks({
        skip: start,
        limit: fetchSize,
        workspaceId: workspaceId as string,
      });
    },
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (_lastGroup, groups) => groups.length,
  });

  return { data, fetchNextPage, isFetching };
}
