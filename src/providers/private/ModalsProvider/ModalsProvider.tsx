import { PropsWithChildren, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { CreateTaskModal } from "@/features/Modals/CreateTaskModal";
import { CreateWorkspaceModal } from "@/features/Modals/CreateWorkspaceModal";
import { CreateBookmarkModal } from "@/features/Modals/CreateBookmarkModal";

export function ModalsProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentModal = useMemo(() => searchParams.get("modal"), [searchParams]);

  const closeModal = useCallback(() => {
    if (searchParams.has("modal")) {
      searchParams.delete("modal");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <>
      {children}
      {currentModal === "create-workspace" && (
        <CreateWorkspaceModal
          onOpenChange={(value) => !value && closeModal()}
        />
      )}
      {currentModal === "create-task" && (
        <CreateTaskModal onOpenChange={(value) => !value && closeModal()} />
      )}
      {currentModal === "create-bookmark" && (
        <CreateBookmarkModal onOpenChange={(value) => !value && closeModal()} />
      )}
    </>
  );
}
