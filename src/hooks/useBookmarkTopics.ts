import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios";

import { TBookmarkTopic } from "@/@types/api.types";

export const getBookmarkTopics = async (workspaceId: string) => {
  return privateAxios
    .get(`/bookmark-topic/${workspaceId}`)
    .then((response) => response.data);
};

export function useBookmarkTopics() {
  const { workspaceId } = useParams();

  return useQuery<TBookmarkTopic[]>({
    queryKey: ["bookmark-topics", workspaceId],
    queryFn: () => getBookmarkTopics(workspaceId as string),
  });
}
