import { Link } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export function TasksPanel() {
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
    </ScrollArea>
  );
}
