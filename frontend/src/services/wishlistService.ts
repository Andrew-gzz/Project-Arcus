// frontend/src/services/wishlistService.ts
import { apiClient } from "../api/client";

// @desc  Obtener la wishlist del usuario autenticado
export const getWishlist = async () => {
  return await apiClient("/wishlist");
};

// @desc  Agregar un producto a la wishlist
export const addToWishlist = async (productId: string) => {
  return await apiClient("/wishlist/add", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
};

// @desc  Eliminar un producto de la wishlist
export const removeFromWishlist = async (productId: string) => {
  return await apiClient(`/wishlist/remove/${productId}`, {
    method: "DELETE",
  });
};
