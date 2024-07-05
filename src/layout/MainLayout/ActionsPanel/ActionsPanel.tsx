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
              size={"icon"}
              onClick={() =>
                setQueryParam({ key: "modal", value: "create-bookmark" })
              }
            >
              <BookmarkIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Bookmark</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              onClick={() =>
                setQueryParam({ key: "modal", value: "create-task" })
              }
            >
              <Pencil2Icon />
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
