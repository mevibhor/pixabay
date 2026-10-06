import { useQuery } from "@tanstack/react-query";

import { fetchPixabay } from "../api/pixabay";

export const usePixabayQuery = (params = {}) => {
  const { type = "images", ...queryParams } = params;

  const isVideo = type === "videos";

  return useQuery({
    queryKey: ["pixabay", isVideo ? "videos" : "images", queryParams],

    queryFn: ({ signal }) =>
      fetchPixabay({
        isVideo,
        params: {
          per_page: 20,
          order: "popular",
          ...queryParams,
        },
        signal,
      }),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
