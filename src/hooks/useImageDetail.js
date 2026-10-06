import { useQuery } from "@tanstack/react-query";

import { fetchPixabay } from "../api/pixabay";

export const useImageDetail = (id, type) => {
  const isVideo =
    type === "film" ||
    type === "animation" ||
    type === "videos" ||
    type === "video";

  return useQuery({
    queryKey: ["pixabay", "detail", id, type],

    queryFn: ({ signal }) =>
      fetchPixabay({
        isVideo,
        params: {
          id,
        },
        signal,
      }),

    staleTime: 1000 * 60 * 5,

    enabled: !!id && !!type,

    retry: 1,
  });
};
