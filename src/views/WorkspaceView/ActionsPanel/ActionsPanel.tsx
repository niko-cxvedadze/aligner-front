import { Button } from "@/components/ui/button";
import { Pencil2Icon, BookmarkIcon } from "@radix-ui/react-icons";
import { useQueryParams } from "@/hooks/useQueryParams";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ActionsPanel() {
  const { setQueryParam } = useQueryParams();

  return (
    <div className="rounded-lg border border-border border-solid p-3 flex justify-between items-center">
      actions panel
      <div className="gap-3 flex flex-row">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() =>
                setQueryParam({ key: "modal", value: "create-bookmark" })
              }
            >
              Create Bookmark
              <BookmarkIcon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Bookmark</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() =>
                setQueryParam({ key: "modal", value: "create-task" })
              }
            >
              Create Task
              <Pencil2Icon className="ml-2 h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Task</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
