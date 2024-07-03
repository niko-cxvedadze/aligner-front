import { UserButton } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";

import { NewWorkspace } from "@/layout/MainLayout/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/layout/MainLayout/ControlPanel/components/WorkspaceButton.tsx";

import { useWorkspaces } from "@/hooks/useWorkspaces";

export function ControlPanel() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data } = useWorkspaces();

  return (
    <div className="p-3 border border-border rounded-lg border-solid flex flex-col justify-between items-center">
      <div className="gap-3 flex flex-col">
        <ToggleGroup
          type={"single"}
          value={workspaceId}
          onValueChange={(newValue) => navigate(`/workspace/${newValue}`)}
          className={`flex flex-col gap-3 ${data?.length === 0 && `hidden`}`}
        >
          {data?.map((workspace) => {
            return (
              <WorkspaceButton key={workspace._id} workspace={workspace} />
            );
          })}
        </ToggleGroup>
        <NewWorkspace />
      </div>
      <UserButton />
    </div>
  );
}
