import { UserButton } from "@clerk/clerk-react";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";
import { NewWorkspace } from "@/features/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/features/ControlPanel/components/WorkspaceButton.tsx";

export function ControlPanel() {
  return (
    <div className="p-3 border-r border-border border-solid flex flex-col justify-between items-center">
      <div className="gap-3 flex flex-col">
        <ToggleGroup type={"single"} className={"flex flex-col gap-3"}>
          <WorkspaceButton name="OMOFOX" value={"omofox"} />
          <WorkspaceButton name="BOG" value={"box"} />
          <WorkspaceButton name="FORWARD" value={"forward"} />
        </ToggleGroup>
        <NewWorkspace />
      </div>
      <UserButton />
    </div>
  );
}
