import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserButton } from "@clerk/clerk-react";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";
import { workspacesOptions } from "@/providers/private/StaticDataProvider";
import { NewWorkspace } from "@/features/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/features/ControlPanel/components/WorkspaceButton.tsx";

export function ControlPanel() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data } = useQuery(workspacesOptions);

  return (
    <div className="p-3 border border-border rounded-lg border-solid flex flex-col justify-between items-center">
      <div className="gap-3 flex flex-col">
        <ToggleGroup
          type={"single"}
          value={workspaceId}
          onValueChange={(newValue) => navigate(`/${newValue}`)}
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
