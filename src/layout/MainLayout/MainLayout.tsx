import { Outlet } from "react-router-dom";
import { ActionsPanel } from "./ActionsPanel";
import { ControlPanel } from "./ControlPanel";

export function MainLayout() {
  return (
    <div className="w-[100%] h-[100vh] flex p-3 flex-row">
      <ControlPanel />
      <div className="flex flex-col w-full ml-3">
        <ActionsPanel />
        <div className="w-[100%] h-[100%] border-border border-solid border rounded-lg flex flex-row mt-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
