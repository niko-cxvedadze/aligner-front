import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { TasksPanel } from "@/features/TasksPanel";
// extensions
import { NotesExt } from "@/features/Extensions/NotesExt";
import { TimerExt } from "@/features/Extensions/TimerExt";
import { BookmarksExt } from "@/features/Extensions/BookmarksExt";
// modal
import { useWorkspaceTasks } from "@/hooks/useWorkspaceTasks";

export function WorkspaceView() {
  useWorkspaceTasks();

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={50}>
          <TasksPanel />
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel>
          <ScrollArea className="h-full">
            <TimerExt />
            <BookmarksExt />
            <NotesExt />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
