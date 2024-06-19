import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { PlusIcon } from "@radix-ui/react-icons";

export function NewWorkspace() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="cursor-pointer border-solid border-border border rounded-sm w-[45px] h-[45px] flex items-center justify-center hover:bg-accent transition ease-in-out">
          <PlusIcon className="w-[20px] h-[20px]" />
        </div>
      </TooltipTrigger>
      <TooltipContent>new workspace</TooltipContent>
    </Tooltip>
  );
}
