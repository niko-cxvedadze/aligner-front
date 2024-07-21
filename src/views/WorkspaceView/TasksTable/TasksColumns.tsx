import { ColumnDef } from "@tanstack/react-table";
import { TTask } from "@/@types/api.types";

import { formatDate } from "@/utils/formatDate.ts";
import { DataTableRowActions } from "./TasksTableRowActions";

import { taskPriorities, taskStatuses } from "@/@config/tasks.config";

export const tasksColumns: ColumnDef<TTask>[] = [
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate ">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center">
          <span className="mr-2">{taskStatuses[status]?.icon}</span>
          {taskStatuses[status]?.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="mr-2">
            {taskPriorities[row.getValue("priority") as string]?.icon}
          </span>
          {taskPriorities[row.getValue("priority") as string]?.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return formatDate(row.getValue("createdAt"), "standard");
    },
  },
  { id: "actions", cell: ({ row }) => <DataTableRowActions row={row} /> },
];
