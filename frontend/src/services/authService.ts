// frontend/src/services/authService.ts
import { apiClient } from "../api/client";

// Iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const data = await apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // El backend devuelve { user: { id, email, username, type }, token }
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

// Registrar nuevo usuario
export const register = async (userData: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const data = await apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    const data = await apiClient("/auth/logout", {
      method: "POST",
    });
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

// Obtener perfil del usuario actual (Ruta protegida)
export const getMe = async () => {
  try {
    const data = await apiClient("/auth/me", {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    throw error.message;
  }
};
