import queryString from "query-string";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/utils/privateAxios";

import { TBookmark } from "@/@types/api.types";

type getBookmarkFilters = {
  workspaceId: string;
};

export const getBookmarks = async (filters: getBookmarkFilters) => {
  const filtersString = queryString.stringify(filters);

  return privateAxios
    .get(`/bookmark?${filtersString}`)
    .then((response) => response.data);
};

export function useBookmarks() {
  const { workspaceId } = useParams();
  return useQuery<TBookmark[]>({
    queryKey: ["bookmarks", { workspaceId }],
    queryFn: () => getBookmarks({ workspaceId: workspaceId as string }),
  });
}
