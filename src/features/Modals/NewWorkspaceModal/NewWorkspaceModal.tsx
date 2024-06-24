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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios.ts";
import { Separator } from "@/components/ui/separator.tsx";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

type NewWorkspaceModalProps = {
  onOpenChange: (open: boolean) => void;
};

export function NewWorkspaceModal({ onOpenChange }: NewWorkspaceModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createWorkspace(values);
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create Workspace</DialogTitle>
            </DialogHeader>
            <Separator />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
