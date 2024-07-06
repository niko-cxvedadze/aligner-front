import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios";
import { useToast } from "@/components/ui/use-toast.ts";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ComboBox } from "@/components/custom/ComboBox";
import {
  taskStatusesList,
  taskStatuses,
  taskPriorities,
  taskPrioritiesList,
} from "@/@config/tasks.config";

type CreateTaskModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().max(512, {
    message: "description must be less than 512 characters.",
  }),
  status: z.string(),
  priority: z.string(),
});

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const { toast } = useToast();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "todo",
      description: "",
      priority: "no-priority",
    },
  });

  const { mutate: createTask, isPending } = useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return privateAxios.post("/task", { workspaceId, ...values });
    },
    onSuccess: (response) => {
      const queryData = queryClient.getQueryData(["tasks", workspaceId]) as any;
      queryData.pages[0].tasks = [...queryData.pages[0].tasks, response.data];
      queryClient.setQueryData(["tasks", workspaceId], queryData);
      toast({ description: "Task created" });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (workspaceId) createTask(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] w-full p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pt-4 px-4 space-y-4">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ComboBox
                          value={field.value}
                          commandInputPlaceholder="Change status..."
                          onChange={(value) => field.onChange(value.value)}
                          options={taskStatusesList}
                        >
                          <Button variant="secondary" size={"sm"}>
                            {field.value && (
                              <>
                                <span className="mr-2">
                                  {taskStatuses[field.value]?.icon}
                                </span>
                                {taskStatuses[field.value]?.label}
                              </>
                            )}
                          </Button>
                        </ComboBox>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ComboBox
                          value={field.value}
                          commandInputPlaceholder="Set priority..."
                          onChange={(value) => field.onChange(value.value)}
                          options={taskPrioritiesList}
                        >
                          <Button variant="secondary" size={"sm"}>
                            {field.value && (
                              <>
                                <span className="mr-2">
                                  {taskPriorities[field.value]?.icon}
                                </span>
                                {taskPriorities[field.value]?.label}
                              </>
                            )}
                          </Button>
                        </ComboBox>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator className="my-4" />
            <DialogFooter className="pb-4 px-4">
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
