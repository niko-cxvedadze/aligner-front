import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Cross2Icon, Crosshair1Icon } from "@radix-ui/react-icons";
import { taskStatusesList, taskPrioritiesList } from "@/@config/tasks.config";
import { DataTableViewOptions } from "@/components/custom/DataTable/DataTableViewOptions";
import { DataTableFacetedFilter } from "@/components/custom/DataTable/DataTableFacetedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onFilterSubmit?: () => void;
}

export function TasksTableToolbar<TData>({
  table,
  onFilterSubmit,
}: DataTableToolbarProps<TData>) {
  const hasFilters = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            title="Status"
            options={taskStatusesList}
            column={table.getColumn("status")}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            title="Priority"
            options={taskPrioritiesList}
            column={table.getColumn("priority")}
          />
        )}
        {hasFilters && (
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
      <div className="space-x-2 flex">
        {hasFilters && (
          <Button className="h-8 px-2 lg:px-3" onClick={onFilterSubmit}>
            <Crosshair1Icon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
