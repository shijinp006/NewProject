import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavoriteList,
  getFavoriteList,
  deleteFavoriteItem,
} from "../api/api";
import toast from "react-hot-toast";

export interface FavoriteItem {
  id: number; // Product ID
  name: string; // Product name
  price: number; // Price per unit
  quantity: number; // Number of items added
  image: string; // Product image URL
  totalAmount: number; // price * quantity
  message: string;
}

export const useAddToFavoriteList = () => {
  const queryClient = useQueryClient();

  return useMutation<FavoriteItem, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      // Call API to add favorite
      return await addToFavoriteList(id);
    },

    // Optimistic update
    onMutate: async ({ id }) => {
      // Cancel outgoing fetches
      await queryClient.cancelQueries({ queryKey: ["favoriteItems"] });

      const previousFavorites =
        queryClient.getQueryData<FavoriteItem[]>(["favoriteItems"]) || [];

      // Add a temporary optimistic favorite
      queryClient.setQueryData<FavoriteItem[]>(
        ["favoriteItems"],
        (old = []) => {
          const oldList = Array.isArray(old) ? old : [];
          if (!oldList.some((item) => item.id === id)) {
            return [...oldList, { id } as FavoriteItem]; // minimal optimistic data
          }
          return oldList;
        }
      );

      return { previousFavorites };
    },

    onError: (err, context: any) => {
      console.error("Failed to add to favorites:", err.message);

      // Rollback optimistic update
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favoriteItems"], context.previousFavorites);
      }

      toast.error(`Failed to add item: ${err.message}`);
    },

    onSuccess: (data) => {
      // Update cache with full data from server
      queryClient.setQueryData<FavoriteItem[]>(
        ["favoriteItems"],
        (old = []) => {
          const oldList = Array.isArray(old) ? old : [];
          if (!oldList.some((item) => item.id === data.id)) {
            return [...oldList, data];
          }
          return oldList.map((item) => (item.id === data.id ? data : item));
        }
      );

      toast.success(data.message);
    },

    onSettled: () => {
      // Immediately refetch to get the latest server state
      queryClient.invalidateQueries({ queryKey: ["favoriteItems"] });
      queryClient.invalidateQueries({ queryKey: ["Food"] });
    },
  });
};
export const useGetFavoriteItemsList = () => {
  return useQuery<FavoriteItem[], Error>({
    queryKey: ["favoriteItems"],
    queryFn: getFavoriteList,
  });
};

export const useDeleteFavoriteItem = () => {
  const queryClient = useQueryClient();

  return useMutation<FavoriteItem, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      // Call API
      return await deleteFavoriteItem(id);
    },

    // Optimistic update: remove item immediately
    onMutate: async ({ id }) => {
      // Cancel any outgoing fetches to prevent conflicts
      await queryClient.cancelQueries({ queryKey: ["favoriteItems"] });

      // Snapshot previous cart
      const previousCart = queryClient.getQueryData<FavoriteItem[]>([
        "favoriteItems",
      ]);

      // Optimistically remove the item from cache
      queryClient.setQueryData<FavoriteItem[]>(["favoriteItems"], (old = []) =>
        old.filter((item: any) => item.id !== id)
      );

      // Return context for potential rollback
      return { previousCart };
    },

    onError: (err, context: any) => {
      console.error("Failed to delete cart item:", err.message);

      // Rollback cache if error occurs
      if (context?.previousCart) {
        queryClient.setQueryData(["favoriteItems"], context.previousCart);
      }
    },

    onSuccess: () => {},

    onSettled: () => {
      // Ensure cache is in sync with server
      queryClient.invalidateQueries({ queryKey: ["favoriteItems"] });
    },
  });
};
