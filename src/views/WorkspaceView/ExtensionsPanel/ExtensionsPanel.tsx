import { BookmarksExt } from "./BookmarksExt";
// import { NotesExt } from "./NotesExt";
// import { TimerExt } from "./TimerExt";

export function ExtensionsPanel() {
  return (
    <div className="p-3">
      <BookmarksExt />
      {/* <NotesExt /> */}
      {/* <TimerExt /> */}
    </div>
  );
}
