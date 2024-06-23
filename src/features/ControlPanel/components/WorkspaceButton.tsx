import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { privateAxios } from "@/utils/privateAxios.ts";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { ToggleGroupItem } from "@/components/ui/toggle-group.tsx";

import { AgreeModal } from "@/components/custom/AgreeModal.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { TWorkspace } from "@/@types/api.types.ts";

interface WorkspaceButtonProps {
  value: string;
  name: string;
}

export function WorkspaceButton({ name, value }: WorkspaceButtonProps) {
  const queryClient = useQueryClient();
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
      )?.filter((data: TWorkspace) => data._id !== value);
      queryClient.setQueryData(["workspaces"], workspaces);
    },
  });

  return (
    <>
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
          <ContextMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => setIsModalOpen(true)}
          >
            <TrashIcon className="mr-1.5" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
        <AgreeModal
          open={isModalOpen}
          title={"Are you sure"}
          onAgree={() => deleteWorkspace(value)}
          onOpenChange={(value) => setIsModalOpen(value)}
        />
      </ContextMenu>
    </>
  );
}
