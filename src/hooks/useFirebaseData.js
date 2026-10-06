import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFirebase } from "../context/Firebase";

const getUniqueItems = (items = []) => {
  const seen = new Set();

  return items.filter((item) => {
    const id = String(item.id);

    if (seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
};

export const useFavorites = () => {
  const {
    user,
    isLoggedIn,
    getFavoriteImages,
    addToFavorites,
    removeFromFavorites,
  } = useFirebase();

  const queryClient = useQueryClient();

  const queryKey = ["favorites", user?.uid];

  const query = useQuery({
    queryKey,
    queryFn: getFavoriteImages,
    enabled: isLoggedIn && !!user,
  });

  const addMutation = useMutation({
    mutationFn: addToFavorites,

    onMutate: async (item) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousFavorites = queryClient.getQueryData(queryKey) || [];

      const exists = previousFavorites.some(
        (favorite) => String(favorite.id) === String(item.id),
      );

      if (!exists) {
        queryClient.setQueryData(queryKey, [
          item,
          ...getUniqueItems(previousFavorites),
        ]);
      }

      return {
        previousFavorites,
      };
    },

    onError: (_error, _item, context) => {
      queryClient.setQueryData(queryKey, context?.previousFavorites || []);

      toast.error("Failed to add to favorites.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromFavorites,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousFavorites = queryClient.getQueryData(queryKey) || [];

      queryClient.setQueryData(
        queryKey,
        previousFavorites.filter((item) => String(item.id) !== String(id)),
      );

      return {
        previousFavorites,
      };
    },

    onError: (_error, _id, context) => {
      queryClient.setQueryData(queryKey, context?.previousFavorites || []);

      toast.error("Failed to remove from favorites.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return {
    favorites: getUniqueItems(query.data || []),

    isLoading: query.isLoading,

    addFavorite: addMutation.mutateAsync,
    removeFavorite: removeMutation.mutateAsync,

    isAddingFavorite: addMutation.isPending,
    isRemovingFavorite: removeMutation.isPending,

    addingId: addMutation.variables?.id ?? null,
    removingId: removeMutation.variables ?? null,
  };
};

export const useDownloads = () => {
  const {
    user,
    isLoggedIn,
    getDownloads,
    addToDownloads,
    removeFromDownloads,
  } = useFirebase();

  const queryClient = useQueryClient();

  const queryKey = ["downloads", user?.uid];

  const query = useQuery({
    queryKey,
    queryFn: getDownloads,
    enabled: isLoggedIn && !!user,
  });

  const addMutation = useMutation({
    mutationFn: addToDownloads,

    onMutate: async (item) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousDownloads = queryClient.getQueryData(queryKey) || [];

      const exists = previousDownloads.some(
        (download) => String(download.id) === String(item.id),
      );

      if (!exists) {
        queryClient.setQueryData(queryKey, [
          item,
          ...getUniqueItems(previousDownloads),
        ]);
      }

      return {
        previousDownloads,
      };
    },

    onError: (_error, _item, context) => {
      queryClient.setQueryData(queryKey, context?.previousDownloads || []);

      toast.error("Failed to save download.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromDownloads,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousDownloads = queryClient.getQueryData(queryKey) || [];

      queryClient.setQueryData(
        queryKey,
        previousDownloads.filter((item) => String(item.id) !== String(id)),
      );

      return {
        previousDownloads,
      };
    },

    onError: (_error, _id, context) => {
      queryClient.setQueryData(queryKey, context?.previousDownloads || []);

      toast.error("Failed to remove download.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return {
    downloads: getUniqueItems(query.data || []),

    isLoading: query.isLoading,

    addDownload: addMutation.mutateAsync,
    removeDownload: removeMutation.mutateAsync,

    isAddingDownload: addMutation.isPending,
    isRemovingDownload: removeMutation.isPending,

    addingId: addMutation.variables?.id ?? null,
    removingId: removeMutation.variables ?? null,
  };
};
