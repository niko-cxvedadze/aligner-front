import { useQuery } from "@tanstack/react-query";
import { UserButton } from "@clerk/clerk-react";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";
import { workspacesOptions } from "@/providers/private/StaticDataProvider";
import { NewWorkspace } from "@/features/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/features/ControlPanel/components/WorkspaceButton.tsx";

export function ControlPanel() {
  const { data } = useQuery(workspacesOptions);

  return (
    <div className="p-3 border-r border-border border-solid flex flex-col justify-between items-center">
      <div className="gap-3 flex flex-col">
        <ToggleGroup type={"single"} className={"flex flex-col gap-3"}>
          {data?.map((workspace) => {
            return (
              <WorkspaceButton
                key={workspace._id}
                name={workspace.name}
                value={workspace._id}
              />
            );
          })}
        </ToggleGroup>
        <NewWorkspace />
      </div>
      <UserButton />
    </div>
  );
}
