import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";

import { ExampleTable } from "@/views/WorkspaceView/TasksPanel/ExampleTable.tsx";

export function TasksPanel() {
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="w-full flex flex-row justify-between px-3 pt-3">
        <div className="flex"></div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => setSearchParams({ modal: "create-task" })}
          >
            <PlusIcon className="mr-1.5" />
            Create Task
          </Button>
        </div>
      </div>
      <div className="px-3">
        <ExampleTable />
      </div>
    </>
  );
}
