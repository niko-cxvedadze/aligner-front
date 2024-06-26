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
                    {/* <FormLabel>Title</FormLabel> */}
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
              <ComboBox
                value="backlog"
                onChange={(value) => console.log(value)}
                options={[
                  {
                    value: "backlog",
                    label: "Backlog",
                  },
                  {
                    value: "todo",
                    label: "Todo",
                  },
                  {
                    value: "in progress",
                    label: "In Progress",
                  },
                  {
                    value: "done",
                    label: "Done",
                  },
                  {
                    value: "canceled",
                    label: "Canceled",
                  },
                ]}
              >
                <Button>Backlog</Button>
              </ComboBox>
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
