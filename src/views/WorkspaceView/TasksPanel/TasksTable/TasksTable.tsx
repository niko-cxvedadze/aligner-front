import { useAtom } from "jotai";
import { useMemo, useRef, useState } from "react";
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
import { useWorkspaceTasks } from "@/hooks/useWorkspaceTasks.ts";

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

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data: tasksData } = useWorkspaceTasks();

  useMemo(() => {
    const filters = filtersToQueryString(columnFilters);
    setQueryParam({ key: "filters", value: filters });
  }, [columnFilters]);

  const table = useReactTable({
    columns: tasksColumns as any,
    data: tasksData?.tasks || [],
    state: {
      columnFilters,
      columnVisibility,
    },
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

  console.log("TasksTable");

  return (
    <div className="px-3">
      <TasksTableToolbar table={table} />
      <div
        ref={tableContainerRef}
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
      </div>
    </div>
  );
}
