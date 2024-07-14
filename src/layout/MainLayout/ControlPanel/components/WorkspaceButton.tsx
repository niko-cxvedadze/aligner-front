import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useLocation } from "react-router-dom";
import { privateAxios } from "@/utils/privateAxios.ts";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast.ts";
import { TWorkspace } from "@/@types/api.types.ts";
import { ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { AgreeModal } from "@/components/custom/AgreeModal.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

interface WorkspaceButtonProps {
  workspace: TWorkspace;
}

export function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteWorkspace } = useMutation({
    mutationKey: ["deleteWorkspace"],
    mutationFn: async (workspaceId: string) => {
      return privateAxios.delete(`/workspace/${workspaceId}`);
    },
    onSuccess: () => {
      toast({ description: "Workspace deleted" });
      setIsModalOpen(false);
      const workspaces = (
        queryClient.getQueryData(["workspaces"]) as any
      )?.filter((data: TWorkspace) => data._id !== workspace._id);
      queryClient.setQueryData(["workspaces"], workspaces);
    },
    onError: () => {
      toast({
        description: "Failed to delete workspace",
        variant: "destructive",
      });
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value={workspace._id}
              variant="outline"
              className={`w-[45px] h-[45px]`}
              style={{ borderColor: workspace?.color, color: workspace?.color }}
            >
              {workspace.name.split("").slice(0, 2).join("").toUpperCase()}
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>{workspace.name}</TooltipContent>
        </Tooltip>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          disabled={workspace.default}
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <TrashIcon className="mr-1.5" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
      <AgreeModal
        open={isModalOpen}
        title={"Are you sure you want to delete this workspace?"}
        description={
          "This action cannot be undone. All tasks in this workspace will be deleted."
        }
        onAgree={() => deleteWorkspace(workspace._id)}
        onOpenChange={(value) => setIsModalOpen(value)}
      />
    </ContextMenu>
  );
}
