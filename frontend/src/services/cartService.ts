// frontend/src/services/cartService.ts
import { apiClient } from "../api/client";

// Obtener el carrito del usuario autenticado
export const getCart = async () => {
  return await apiClient("/cart");
};

// Agregar un producto al carrito
export const addToCart = async (productId: string, quantity: number = 1) => {
  return await apiClient("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

// Actualizar la cantidad de un producto en el carrito
export const updateCart = async (productId: string, quantity: number) => {
  return await apiClient("/cart/update", {
    method: "PUT",
    body: JSON.stringify({ productId, quantity }),
  });
};

// Eliminar un producto del carrito
export const removeFromCart = async (productId: string) => {
  return await apiClient(`/cart/remove/${productId}`, {
    method: "DELETE",
  });
};

// Vaciar todo el carrito
export const clearCart = async () => {
  return await apiClient("/cart/clear", {
    method: "DELETE",
  });
};
