import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
import { Separator } from "@/components/ui/separator";

type CreateBookmarkModalProps = {
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  url: z.string(),
  title: z.string().max(64).optional(),
});

export function CreateBookmarkModal({
  onOpenChange,
}: CreateBookmarkModalProps) {
  const { toast } = useToast();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { mutate: createBookmark, isPending } = useMutation({
    mutationKey: ["createBookmark", workspaceId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return privateAxios.post("/bookmark", { workspaceId, ...values });
    },
    onSuccess: () => {
      toast({ description: "Bookmark created" });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        description: "Failed to create bookmark",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (workspaceId) createBookmark(values);
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] w-full p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pt-4 px-4 space-y-4">
              <DialogHeader>
                <DialogTitle>Create Bookmark</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter bookmark url" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter bookmark title" {...field} />
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
