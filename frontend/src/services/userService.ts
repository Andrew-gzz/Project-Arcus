import { apiClient } from "../api/client";

export const updateProfile = async (data: { username?: string; email?: string }) => {
  return await apiClient("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  return await apiClient("/auth/password", {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

export const listUsers = async () => {
  return await apiClient("/users");
};

export const deleteUser = async (id: string) => {
  return await apiClient(`/users/${id}`, {
    method: "DELETE",
  });
};
