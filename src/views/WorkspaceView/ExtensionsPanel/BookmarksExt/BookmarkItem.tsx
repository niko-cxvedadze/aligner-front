import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { TBookmark } from "@/@types/api.types";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { getFavicon } from "@/utils/getFavicon";

type BookmarkItemProps = {
  bookmark: TBookmark;
};
export function BookmarkItem({ bookmark }: BookmarkItemProps) {
  const favicon = useMemo(() => getFavicon(bookmark.url), [bookmark.url]);

  return (
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
  );
}
