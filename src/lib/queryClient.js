import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // One place to show every failed request, so individual queries don't each need a toast.
    onError: (error) =>
      toast.error(error.message || "Something went wrong. Please try again."),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data counts as fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // unused data stays cached for 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
