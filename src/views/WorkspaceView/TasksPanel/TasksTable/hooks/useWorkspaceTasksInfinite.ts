import { privateAxios } from "@/utils/privateAxios";
import { ColumnFiltersState } from "@tanstack/react-table";
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
  columnFilters,
  workspaceId,
}: {
  columnFilters: ColumnFiltersState;
  workspaceId?: string;
}) {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<any>({
    queryKey: ["tasks", workspaceId, columnFilters],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;

      const filters = {
        skip: start,
        limit: fetchSize,
        workspaceId: workspaceId as string,
        statuses: [] as any[],
        priorities: [] as any[],
      };
      const statuses = columnFilters.find(
        (filter) => filter.id === "status"
      )?.value;

      if (Array.isArray(statuses) && statuses.length) {
        filters.statuses = statuses;
      }

      const priorities = columnFilters.find(
        (filter) => filter.id === "priority"
      )?.value;

      if (Array.isArray(priorities) && priorities.length) {
        filters.priorities = priorities;
      }

      const fetchedData = await fetchTasks(filters);
      return fetchedData;
    },
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (_lastGroup, groups) => groups.length,
  });

  return { data, fetchNextPage, isFetching };
}
