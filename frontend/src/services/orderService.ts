import { apiClient } from "../api/client";

export const createOrder = async () => {
  return await apiClient("/orders", {
    method: "POST",
  });
};

export const buyNow = async (productId: string, quantity: number) => {
  return await apiClient("/orders/buy-now", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const getMyOrders = async () => {
  return await apiClient("/orders/my-orders");
};

export const getOrderById = async (id: string) => {
  return await apiClient(`/orders/${id}`);
};

export const updateOrderStatus = async (id: string, status: string) => {
  return await apiClient(`/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};

export const cancelOrder = async (id: string) => {
  return await apiClient(`/orders/${id}`, {
    method: "DELETE",
  });
};
