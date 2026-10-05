import { useQuery } from "@tanstack/react-query";
import { fetchPixabay } from "../api/pixabay";

export const usePixabayQuery = (params = {}) => {
  const { type, ...queryParams } = params;

  return useQuery({
    queryKey: ["pixabay", queryParams],

    queryFn: ({ signal }) =>
      fetchPixabay({
        isVideo: type === "videos",
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
