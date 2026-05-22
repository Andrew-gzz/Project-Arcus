import { apiClient } from "../api/client";

export const createSubscription = async (type: string) => {
  return await apiClient("/subscriptions", {
    method: "POST",
    body: JSON.stringify({ type }),
  });
};

export const getMySubscription = async () => {
  return await apiClient("/subscriptions/my");
};

export const cancelSubscription = async () => {
  return await apiClient("/subscriptions/cancel", {
    method: "DELETE",
  });
};
