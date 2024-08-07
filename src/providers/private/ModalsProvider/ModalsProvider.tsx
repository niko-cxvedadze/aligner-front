import { PropsWithChildren, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { WorkspaceModal } from "@/features/Modals/WorkspaceModal";
import { CreateTaskModal } from "@/features/Modals/CreateTaskModal";
import { CreateBookmarkModal } from "@/features/Modals/CreateBookmarkModal";

export function ModalsProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentModal = useMemo(() => searchParams.get("modal"), [searchParams]);
  const update = useMemo(() => searchParams.get("update"), [searchParams]);

  const closeModal = useCallback(() => {
    if (searchParams.has("modal")) {
      searchParams.delete("modal");
      setSearchParams(searchParams);
    }
    if (searchParams.has("update")) {
      searchParams.delete("update");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <>
      {children}
      <WorkspaceModal
        updateId={update}
        open={currentModal === "workspace"}
        onOpenChange={(value) => !value && closeModal()}
      />
      <CreateTaskModal
        open={currentModal === "create-task"}
        onOpenChange={closeModal}
      />
      <CreateBookmarkModal
        open={currentModal === "create-bookmark"}
        onOpenChange={(value) => !value && closeModal()}
      />
    </>
  );
}
