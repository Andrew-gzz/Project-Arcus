//frontend/src/services/categoryService.ts

import { apiClient } from "../api/client";

// Agregar nueva categoría

export const addCategory = async (categoryData: {
  name: String;
  image: String;
}) => {
  try {
    const data = await apiClient("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

//Obtener lista de categoria
export const getCategories = async () => {
  try {
    // Realiza un GET a /api/categories
    const data = await apiClient("/categories", {
      method: "GET",
    });

    // Retorna el array de categorías
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener las categorías");
  }
};

// Obtener una sola categoría por su ID
export const getCategoryById = async (id: string) => {
  try {
    const data = await apiClient(`/categories/${id}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener la categoría");
  }
};

// Actualizar una categoría existente
export const updateCategory = async (
  id: string,
  categoryData: { name?: string; image?: string },
) => {
  try {
    const data = await apiClient(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al actualizar la categoría");
  }
};
