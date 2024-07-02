import { useMemo, useCallback, useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Person } from "../mockData.ts";
import { privateAxios } from "@/utils/privateAxios.ts";
import { tasksColumns } from "@/views/WorkspaceView/TasksPanel/TasksTable/TasksColumns.tsx";

async function fetchTasks(props: {
  workspaceId: string;
  skip: number;
  limit: number;
}) {
  const { workspaceId, skip, limit } = props;
  return privateAxios
    .get(`/task/${workspaceId}?skip=${skip}&limit=${limit}`)
    .then((response) => response.data);
}

const fetchSize = 50;

export function TasksTable() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<any>({
    queryKey: ["tasks", workspaceId],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;
      const fetchedData = await fetchTasks({
        workspaceId: workspaceId as string,
        skip: start,
        limit: fetchSize,
      });
      return fetchedData;
    },
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (_lastGroup, groups) => groups.length,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.tasks) ?? [],
    [data]
  );

  const totalDBRowCount = useMemo(() => data?.pages?.[0]?.total ?? 0, [data]);

  const totalFetched = useMemo(() => flatData.length, [flatData.length]);

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  const table = useReactTable({
    columns: tasksColumns as any,
    data: flatData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div
      ref={tableContainerRef}
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      className="rounded-md border table-height mt-3 w-full overflow-auto relative"
    >
      <Table>
        <TableHeader
          style={{
            zIndex: 1,
            position: "sticky",
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="w-full flex">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="flex items-center"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          className="relative grid"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<Person>;
            return (
              <TableRow
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                className="flex absolute w-full"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className="flex"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
