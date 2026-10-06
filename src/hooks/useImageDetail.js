import { useQuery } from "@tanstack/react-query";
import { fetchPixabay } from "../api/pixabay";

export const useImageDetail = (id, type) => {
  return useQuery({
    queryKey: ["pixabay", "detail", id],
    queryFn: ({ signal }) =>
      fetchPixabay({
        isVideo: type === "animation" || type === "film",
        params: { id },
        signal,
      }),
    // Keept data fresh for 5 minutes
    staleTime: 1000 * 60 * 5,
    enabled: !!id, // Only fetch if ID exists
  });
};
