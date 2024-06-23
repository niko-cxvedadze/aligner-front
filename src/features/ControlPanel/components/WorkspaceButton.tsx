import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TrashIcon } from "@radix-ui/react-icons";
import { ToggleGroupItem } from "@/components/ui/toggle-group.tsx";

interface WorkspaceButtonProps {
  value: string;
  name: string;
}

export function WorkspaceButton({ name, value }: WorkspaceButtonProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <ToggleGroupItem
          value={value}
          className="w-[45px] h-[45px]"
          variant="outline"
        >
          {name.split("").slice(0, 2).join("").toUpperCase()}
        </ToggleGroupItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="cursor-pointer text-destructive">
          <TrashIcon className="mr-1.5" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
