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
import { ActionsPanel } from "@/views/WorkspaceView/ActionsPanel";

export function WorkspaceView() {
  const { isLoading: isTasksLoading } = useWorkspaceTasks();
  const { isLoading: isBookmarksLoading } = useBookmarks();

  if (isTasksLoading || isBookmarksLoading) {
    return;
  }

  return (
    <div className="w-full flex flex-col h-full">
      <ActionsPanel />
      <div className="w-[100%] h-[100%] border-border border-solid border rounded-lg flex flex-row mt-3">
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
      </div>
    </div>
  );
}
