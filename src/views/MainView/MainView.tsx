import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

import { TasksPanel } from "@/features/TasksPanel";

export function MainView() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={50}>
        <TasksPanel />
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel>
        <ScrollArea className="h-full"></ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
