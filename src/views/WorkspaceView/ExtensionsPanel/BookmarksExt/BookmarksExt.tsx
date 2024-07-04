import { useBookmarks } from "@/hooks/useBookmarks";
import { useBookmarkTopics } from "@/hooks/useBookmarkTopics";

import { BookmarkItem } from "./BookmarkItem";

export function BookmarksExt() {
  const { data: bookmarks } = useBookmarks();
  const { data: bookmarkTopics } = useBookmarkTopics();

  return (
    <div className="w-full border-border border rounded-lg p-3">
      <h4 className="text-xl font-semibold tracking-tight">Bookmarks</h4>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {bookmarks?.map((bookmark) => {
          return <BookmarkItem bookmark={bookmark} key={bookmark._id} />;
        })}
      </div>
    </div>
  );
}
