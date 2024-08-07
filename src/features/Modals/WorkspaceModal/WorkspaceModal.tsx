import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast.ts";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { ColorPicker } from "@/components/custom/ColorPicker";

import { useWorkspaces } from "@/hooks/useWorkspaces";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  color: z.string().optional(),
});

type WorkspaceModalProps = {
  open: boolean;
  updateId: string | null;
  onOpenChange: (open: boolean) => void;
};

export function WorkspaceModal({
  open,
  updateId,
  onOpenChange,
}: WorkspaceModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [mode, setMode] = useState<"create" | "update">("create");

  const { mutate: createWorkspace, isPending } = useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return privateAxios.post("/workspace", values);
    },
    onSuccess: (response) => {
      const queryData = queryClient.getQueryData(["workspaces"]);
      const newWorkspaces = [...(queryData as any), response.data];
      queryClient.setQueryData(["workspaces"], newWorkspaces);
      toast({ description: "Workspace created" });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        description: "Failed to create workspace",
        variant: "destructive",
      });
    },
  });

  const { data: workspaces } = useWorkspaces();

  const currentWorkspace = useMemo(() => {
    if (!updateId) return undefined;
    return workspaces?.find((workspace) => workspace._id === updateId);
  }, [updateId, workspaces]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createWorkspace(values);
  }

  useEffect(() => {
    if (currentWorkspace) {
      form.reset({
        name: currentWorkspace.name,
        color: currentWorkspace.color,
      });
      setMode("update");
    }
  }, [currentWorkspace]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] p-0 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pt-4 px-4 space-y-4">
              <DialogHeader>
                <DialogTitle>
                  {mode === "update" ? "Update Workspace" : "Create Workspace"}
                </DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ColorPicker
                        className="w-full"
                        placeholder="Pick a workspace color"
                        background={field.value || ""}
                        setBackground={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-4" />
            <DialogFooter className="pb-4 px-4">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {mode === "update" ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
