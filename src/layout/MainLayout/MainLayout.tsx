import { Outlet } from "react-router-dom";
import { ControlPanel } from "./ControlPanel";

export function MainLayout() {
  return (
    <div className="w-[100%] h-[100vh] flex p-3 flex-row">
      <ControlPanel />
      <div className="flex flex-col w-full ml-3">
        <Outlet />
      </div>
    </div>
  );
}
