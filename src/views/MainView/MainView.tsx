import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import { TasksPanel } from "@/features/TasksPanel";

// extensions
import { NotesExt } from "@/features/Extensions/NotesExt";
import { TimerExt } from "@/features/Extensions/TimerExt";
import { BookmarksExt } from "@/features/Extensions/BookmarksExt";

// modal
import { CreateTaskModal } from "@/features/Modals/CreateTaskModal";
import { NewWorkspaceModal } from "@/features/Modals/NewWorkspaceModal";

export function MainView() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

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
      <Routes>
        <Route
          path={"/new-workspace"}
          element={
            <NewWorkspaceModal
              onOpenChange={(value) => !value && navigate(`/${workspaceId}`)}
            />
          }
        />
        <Route
          path={"/create-task"}
          element={
            <CreateTaskModal
              onOpenChange={(value) => !value && navigate(`/${workspaceId}`)}
            />
          }
        />
      </Routes>
    </>
  );
}
