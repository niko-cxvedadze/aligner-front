import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Outlet />
    </div>
  );
}
