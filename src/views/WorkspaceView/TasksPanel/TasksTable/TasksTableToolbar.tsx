import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { taskStatusesList, taskPrioritiesList } from "@/@config/tasks.config";
import { DataTableViewOptions } from "@/components/custom/DataTable/DataTableViewOptions";
import { DataTableFacetedFilter } from "@/components/custom/DataTable/DataTableFacetedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TasksTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={taskStatusesList}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={taskPrioritiesList}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
