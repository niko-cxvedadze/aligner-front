import { UserButton } from "@clerk/clerk-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";

import { NewWorkspace } from "@/layout/MainLayout/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/layout/MainLayout/ControlPanel/components/WorkspaceButton.tsx";

import { useWorkspaces } from "@/hooks/useWorkspaces";

import { Toggle } from "@/components/ui/toggle.tsx";
import { Separator } from "@/components/ui/separator";

import { House } from "lucide-react";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";

export function ControlPanel() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { pathname } = useLocation();
  const { data } = useWorkspaces();

  return (
    <div className="p-3 border border-border rounded-lg border-solid flex flex-col justify-between items-center">
      <div>
        <Toggle
          variant="outline"
          pressed={pathname === "/"}
          aria-label="Toggle italic"
          onPressedChange={(pressed) => pressed && navigate("/")}
          className={`w-[45px] h-[45px]`}
        >
          <House />
        </Toggle>
        <Separator className="my-3" />
        <div className="gap-3 flex flex-col">
          <ToggleGroup
            type={"single"}
            value={workspaceId || "default"}
            onValueChange={(newValue) => navigate(`/workspace/${newValue}`)}
            className={`flex flex-col gap-3 ${data?.length === 0 && `hidden`}`}
          >
            <ToggleGroupItem
              value="default"
              className="hidden"
            ></ToggleGroupItem>
            {data?.map((workspace) => {
              return (
                <WorkspaceButton key={workspace._id} workspace={workspace} />
              );
            })}
          </ToggleGroup>
          <NewWorkspace />
        </div>
      </div>
      <UserButton />
    </div>
  );
}
