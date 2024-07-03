import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TasksTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between w-full">
      <div></div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
