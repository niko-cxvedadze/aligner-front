import { Outlet } from "react-router-dom";
import { ControlPanel } from "@/features/ControlPanel";

export function MainLayout() {
  return (
    <div className="w-[100%] h-[100vh] flex p-3 flex-row">
      <div className="w-[100%] h-[100%] border-border border-solid border rounded-lg flex flex-row">
        <ControlPanel />
        <Outlet />
      </div>
    </div>
  );
}
