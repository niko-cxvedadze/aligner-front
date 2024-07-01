import { BookmarksExt } from "./BookmarksExt";
import { NotesExt } from "./NotesExt";
import { TimerExt } from "./TimerExt";

export function ExtensionsPanel() {
  return (
    <div>
      <BookmarksExt />
      <NotesExt />
      <TimerExt />
    </div>
  );
}
