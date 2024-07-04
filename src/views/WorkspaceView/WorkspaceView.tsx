import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import { TasksPanel } from "./TasksPanel";
import { ExtensionsPanel } from "./ExtensionsPanel";

// modal
import { useWorkspaceTasks } from "@/hooks/useWorkspaceTasks";

export function WorkspaceView() {
  useWorkspaceTasks();

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>
        <TasksPanel />
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
