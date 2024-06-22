import { Outlet, Routes, Route, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import { ControlPanel } from "@/features/ControlPanel";
import { NewWorkspaceModal } from "@/features/NewWorkspaceModal";

export function MainLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100%] h-[100vh] flex p-3 flex-row">
        <div className="w-[100%] h-[100%] border-border border-solid border rounded-lg flex flex-row">
          <ControlPanel />
          <Outlet />
        </div>
      </div>
      <Routes>
        <Route
          path={"/new-workspace"}
          element={
            <NewWorkspaceModal open={true} onOpenChange={() => navigate("/")} />
          }
        />
      </Routes>
    </>
  );
}
