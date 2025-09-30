import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { addToCart, getCartItems, updateCartQty, deleteCart } from "../api/api";

export interface CartItem {
  id: string; // Product ID
  name: string; // Product name
  price: number; // Price per unit
  quantity: number; // Number of items added
  image: string; // Product image URL
  totalAmount: number; // price * quantity
  message: string;
}
interface UpdateCartQtyPayload {
  id: number;
  quantity: number;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; cart: CartItem[] }, // ✅ correct response type
    Error,
    { id: number; quantity: number }
  >({
    mutationFn: ({ id, quantity }) => addToCart(id, quantity),

    // ✅ Optimistic update
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });

      const previousCart = queryClient.getQueryData(["cartItems"]);

      queryClient.setQueryData<CartItem[]>(["cartItems"], (oldCart = []) => {
        // Normalize oldCart to an array
        let cartArray: CartItem[] = [];
        if (Array.isArray(oldCart)) cartArray = oldCart;
        else if (oldCart && Array.isArray((oldCart as any).cart))
          cartArray = (oldCart as any).cart;

        const exists = cartArray.find((item:any) => item.id === id);
        if (exists) {
          return cartArray.map((item:any) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  totalAmount: (item.quantity + quantity) * item.price,
                  cart: true,
                }
              : item
          );
        }

        // Add new placeholder item
        return [
          ...cartArray,
          {
            id,
            name: "Loading...",
            price: 0,
            quantity,
            totalAmount: 0,
            cart: true,
          },
        ];
      });

      return { previousCart };
    },

    // ✅ Rollback on error
    onError: (error, _variables, context: any) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart);
      }
      toast.error(`Failed to add item: ${error.message}`);
    },

    // ✅ Sync with server response
    onSuccess: (data) => {
      queryClient.setQueryData(["cartItems"], data.cart);
      toast.success(data.message);
    },

    // ✅ Ensure fresh data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteItems"] });
    },
  });
};

export const useGetCartItems = () => {
  return useQuery<CartItem[], Error>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
};

export const useUpdateQty = () => {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, UpdateCartQtyPayload>({
    mutationFn: async ({ id, quantity }) => {
      // Cancel ongoing cart queries before mutation
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });

      // Call API
      return await updateCartQty(id, quantity);
    },

    onSuccess: (updatedItem) => {
      // Safely update cache
      queryClient.setQueryData<CartItem[]>(["cartItems"], (oldCart = []) =>
        oldCart.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    },

    onError: (error: any) => {
      console.error("Failed to update cart:", error.message);
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      // Call API
      return await deleteCart(id);
    },

    // Optimistic update: remove item immediately
    onMutate: async ({ id }) => {
      // Cancel any outgoing fetches to prevent conflicts
      await queryClient.cancelQueries({ queryKey: ["cartItems"] });

      // Snapshot previous cart
      const previousCart = queryClient.getQueryData<CartItem[]>(["cartItems"]);

      // Optimistically remove the item from cache
      queryClient.setQueryData<CartItem[]>(["cartItems"], (old = []) =>
        old.filter((item: any) => item.id !== id)
      );

      // Return context for potential rollback
      return { previousCart };
    },

    onError: (err, context: any) => {
      console.error("Failed to delete cart item:", err.message);

      // Rollback cache if error occurs
      if (context?.previousCart) {
        queryClient.setQueryData(["cartItems"], context.previousCart);
      }
    },

    onSuccess: () => {},

    onSettled: () => {
      // Ensure cache is in sync with server
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};
