import { apiClient } from "../api/client";

export const getSalesByCategory = async () => {
  return await apiClient("/reports/sales-by-category");
};

export const getTopProducts = async () => {
  return await apiClient("/reports/top-products");
};

export const getTopUsers = async () => {
  return await apiClient("/reports/top-users");
};

export const getSubscriptionStats = async () => {
  return await apiClient("/reports/subscription-stats");
};
