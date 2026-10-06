import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPixabay } from "../api/pixabay";

// Pixabay's API terms ask apps to cache results for 24 hours.
const ONE_DAY = 1000 * 60 * 60 * 24;

// type is "all", "photo", "illustration", "vector" or "videos".
export const useHomeFeed = (type) =>
  useQuery({
    queryKey: ["pixabay", "home", type],
    queryFn: ({ signal }) =>
      fetchPixabay({
        isVideo: type === "videos",
        params: type === "videos" ? {} : { image_type: type },
        signal,
      }),
    staleTime: ONE_DAY,
    gcTime: ONE_DAY,
    // Keep showing the old results while a new tab loads, instead of a blank screen.
    placeholderData: keepPreviousData,
  });
