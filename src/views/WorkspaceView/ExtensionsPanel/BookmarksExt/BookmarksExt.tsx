import { useBookmarks } from "@/hooks/useBookmarks";
import { useBookmarkTopics } from "@/hooks/useBookmarkTopics";

export function BookmarksExt() {
  const { data: bookmarks } = useBookmarks();
  const { data: bookmarkTopics } = useBookmarkTopics();

  return (
    <div className="w-full border-border border rounded-lg p-3">
      bookmarks ext
    </div>
  );
}
