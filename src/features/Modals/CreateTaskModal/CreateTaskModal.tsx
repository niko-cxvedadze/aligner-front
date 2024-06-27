import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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

export function CreateTaskModal({ onOpenChange }: CreateTaskModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "todo",
      priority: "no-priority",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
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
                                <span className="mr-1.5">
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
                                <span className="mr-1.5">
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
              <Button type="submit" disabled={true}>
                {/* {true && <ReloadIcon />} */}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
