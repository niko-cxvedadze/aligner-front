import { UserButton } from "@clerk/clerk-react";
import { ToggleGroup } from "@/components/ui/toggle-group.tsx";
import { NewWorkspace } from "@/features/ControlPanel/components/NewWorkspace.tsx";
import { WorkspaceButton } from "@/features/ControlPanel/components/WorkspaceButton.tsx";

import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export function ControlPanel() {
  const { getToken } = useAuth();

  async function getWorkspaces() {
    const token = await getToken({ template: "basic-token-v1" });
    console.log(token);

    const workspaces = await axios("http://localhost:3000/api/workspace");
    console.log(workspaces);
  }

  useEffect(() => {
    getWorkspaces();
  }, []);

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
