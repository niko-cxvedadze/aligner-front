import { useMemo, useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { toast } from "@/components/ui/use-toast.ts";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTask } from "@/@types/api.types";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios";
import { AgreeModal } from "@/components/custom/AgreeModal";
import { cloneDeep } from "@/utils/cloneDeep";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const task: TTask = useMemo(() => row.original as TTask, [row.original]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteTask } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => {
      return privateAxios.delete(`/task/${taskId}`);
    },
    onSuccess: () => {
      const queryData = queryClient.getQueryData([
        "tasks",
        task.workspaceId,
      ]) as any;
      queryData.tasks = queryData.tasks.filter(
        (data: TTask) => data._id !== task._id
      );

      queryClient.setQueryData(["tasks", task.workspaceId], {
        ...queryData,
        deleted: task._id,
      });
      toast({ description: "Task deleted" });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Failed to delete task",
        variant: "destructive",
      });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <TrashIcon className="mr-1.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AgreeModal
        open={isModalOpen}
        title={"Are you sure you want to delete this bookmark?"}
        description={"This action cannot be undone."}
        onAgree={() => deleteTask(task._id)}
        onOpenChange={(value) => setIsModalOpen(value)}
      />
    </DropdownMenu>
  );
}
