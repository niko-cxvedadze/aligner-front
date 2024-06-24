import { Outlet, Routes, Route, useNavigate } from "react-router-dom";
import { ActionsPanel } from "@/features/ActionsPanel";
import { ControlPanel } from "@/features/ControlPanel";

// modal
import { CreateTaskModal } from "@/features/Modals/CreateTaskModal";
import { NewWorkspaceModal } from "@/features/Modals/NewWorkspaceModal";

export function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[100%] h-[100vh] flex p-3 flex-row">
        <ControlPanel />
        <div className="flex flex-col w-full ml-3">
          <ActionsPanel />
          <div className="w-[100%] h-[100%] border-border border-solid border rounded-lg flex flex-row mt-3">
            <Outlet />
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path={"/new-workspace"}
          element={
            <NewWorkspaceModal
              onOpenChange={(value) => !value && navigate("/")}
            />
          }
        />
        <Route
          path={"/create-task"}
          element={
            <CreateTaskModal
              onOpenChange={(value) => !value && navigate("/")}
            />
          }
        />
      </Routes>
    </>
  );
}
