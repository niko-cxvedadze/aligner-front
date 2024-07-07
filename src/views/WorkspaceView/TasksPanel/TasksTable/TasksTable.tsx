import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { atomWithStorage } from "jotai/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TasksTableToolbar } from "./TasksTableToolbar.tsx";
import { tasksColumns } from "@/views/WorkspaceView/TasksPanel/TasksTable/TasksColumns.tsx";
import {
  filtersToQueryString,
  queryStringToFilters,
} from "@/utils/filtersQueryString.ts";
import { useQueryParams } from "@/hooks/useQueryParams.ts";
import { useWorkspaceTasksInfinite } from "./hooks/useWorkspaceTasksInfinite.ts";

export const tasksTableViewAtom = atomWithStorage<VisibilityState>(
  "tasksTableView",
  {}
);

export function TasksTable() {
  const { setQueryParam, searchParams } = useQueryParams();
  const [columnVisibility, setColumnVisibility] = useAtom(tasksTableViewAtom);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    queryStringToFilters(searchParams.get("filters") || ([] as any))
  );

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetching } = useWorkspaceTasksInfinite({
    workspaceId,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.tasks) ?? [],
    [data?.pages, data?.pages.length, data?.pages[0]?.tasks]
  );

  const totalFetched = useMemo(() => flatData.length, [flatData.length]);
  const totalDBRowCount = useMemo(() => data?.pages?.[0]?.total ?? 0, [data]);

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

  useMemo(() => {
    const filters = filtersToQueryString(columnFilters);
    setQueryParam({ key: "filters", value: filters });
  }, [columnFilters]);

  console.log(columnFilters);
  const table = useReactTable({
    columns: tasksColumns as any,
    data: flatData,
    state: {
      columnVisibility,
      columnFilters,
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 48,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached, columnFilters]);

  return (
    <div className="px-3">
      <TasksTableToolbar table={table} />
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
              const row = rows[virtualRow.index] as Row<any>;
              return (
                <TableRow
                  key={row.id}
                  data-index={virtualRow.index}
                  className="w-full flex absolute items-center"
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
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
        <div className={"w-full flex justify-center"}>
          {totalFetched < totalDBRowCount && !isFetching && (
            <Button
              className={"my-3 h-8 px-2 lg:px-3"}
              onClick={() => fetchNextPage()}
              variant={"ghost"}
            >
              See More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
