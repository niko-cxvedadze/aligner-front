import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { workspacesOptions } from "@/providers/private/StaticDataProvider";

export function NotFound() {
  const navigate = useNavigate();
  const { data } = useQuery(workspacesOptions);

  useEffect(() => {
    const workspace = data?.find((workspace) => workspace.default);
    if (workspace) navigate(`/${workspace._id}`);
  }, [data]);

  return <></>;
}
