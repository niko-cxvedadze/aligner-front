import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TBookmark } from "@/@types/api.types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { getFavicon } from "@/utils/getFavicon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "@/components/ui/use-toast.ts";
import { TrashIcon } from "@radix-ui/react-icons";
import { privateAxios } from "@/utils/privateAxios";
import { AgreeModal } from "@/components/custom/AgreeModal";

type BookmarkItemProps = {
  bookmark: TBookmark;
};
export function BookmarkItem({ bookmark }: BookmarkItemProps) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favicon = useMemo(() => getFavicon(bookmark.url), [bookmark.url]);

  const { mutate: deleteBookmark } = useMutation({
    mutationKey: ["deleteBookmark"],
    mutationFn: async (bookmarkId: string) => {
      return privateAxios.delete(`/bookmark/${bookmarkId}`);
    },
    onSuccess: () => {
      toast({ description: "Bookmark deleted" });
      setIsModalOpen(false);
      const bookmarks = (
        queryClient.getQueryData(["bookmarks", bookmark.workspaceId]) as any
      )?.filter((data: TBookmark) => data._id !== bookmark._id);
      queryClient.setQueryData(["bookmarks", bookmark.workspaceId], bookmarks);
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
        <div className="flex gap-1.5 items-center">
          {favicon && (
            <img
              src={favicon}
              className="w-[15px] rounded-full"
              onError={() => console.log(favicon)}
            />
          )}
          <Badge variant="outline" className="lowercase">
            {bookmark.topic?.title || "none"}
          </Badge>
          <a href={bookmark.url} target="_blank" className="truncate">
            {bookmark.title}
          </a>
          <ExternalLinkIcon
            style={{ flex: "0 0 15px" }}
            className="cursor-pointer"
            onClick={() => window.open(bookmark.url, "_blank")}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer text-destructive"
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
        onAgree={() => deleteBookmark(bookmark._id)}
        onOpenChange={(value) => setIsModalOpen(value)}
      />
    </ContextMenu>
  );
}
