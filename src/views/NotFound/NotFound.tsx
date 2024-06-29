import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspaces } from "@/hooks/useWorkspaces";

export function NotFound() {
  const navigate = useNavigate();
  const { data } = useWorkspaces();

  useEffect(() => {
    const workspace = data?.find((workspace) => workspace.default);
    if (workspace) navigate(`/workspace/${workspace._id}`);
  }, [data]);

  return <></>;
}
