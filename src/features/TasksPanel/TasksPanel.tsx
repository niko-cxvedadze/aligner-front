import { Link } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useWorkspaceTasks } from "@/hooks/useWorkspaceTasks";

import { DataTable } from "./TasksTable/DataTable";
import { tasksColumns } from "./TasksTable/Columns";

export function TasksPanel() {
  const { data: tasks } = useWorkspaceTasks();

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full flex flex-row justify-between px-3 pt-3">
        <div className="flex"></div>
        <div>
          <Link
            to="create-task"
            className={buttonVariants({ variant: "outline" })}
          >
            <PlusIcon className="mr-1.5" />
            Create Task
          </Link>
        </div>
      </div>
      <div className="mt-3 px-3">
        <DataTable columns={tasksColumns} data={tasks || []} />
      </div>
    </ScrollArea>
  );
}
