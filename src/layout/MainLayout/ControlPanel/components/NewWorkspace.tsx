import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { useSearchParams } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";

export function NewWorkspace() {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onClick={() => setSearchParams({ modal: "create-workspace" })}
          className="cursor-pointer border-solid border-border border rounded-sm w-[45px] h-[45px] flex items-center justify-center hover:bg-accent transition ease-in-out"
        >
          <PlusIcon className="w-[20px] h-[20px]" />
        </div>
      </TooltipTrigger>
      <TooltipContent>Create Workspace</TooltipContent>
    </Tooltip>
  );
}
