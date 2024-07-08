import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { TasksTable } from "./TasksTable";
import { ExtensionsPanel } from "./ExtensionsPanel";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useWorkspaceTasks } from "@/hooks/useWorkspaceTasks";

export function WorkspaceView() {
  const { isLoading: isTasksLoading } = useWorkspaceTasks();
  const { isLoading: isBookmarksLoading } = useBookmarks();

  if (isTasksLoading || isBookmarksLoading) {
    return;
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>
        <TasksTable />
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel>
        <ScrollArea className="h-full">
          <ExtensionsPanel />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
