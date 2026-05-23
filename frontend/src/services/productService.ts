//frontend/src/services/productService.ts
import { apiClient } from "../api/client";
// Agregar nuevo producto
export const addProduct = async (productData: {
  name: String;
  description: String;
  price: Number;
  category: String[];
  image: String;
  stock: Number;
}) => {
  try {
    const data = await apiClient("/products/", {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return data;
  } catch (error: any) {
    throw error.message;
  }
};

//Obtener lista de productos con filtros

export const getProducts = async (
  filters: {
    category?: string[]; // Múltiples categorías → ?category=RPG&category=Acción
    search?: string; // Búsqueda por nombre o descripción
    inStock?: boolean; // true = solo con stock, false = solo agotados
    minRating?: number; // Rating mínimo (1-5)
    maxRating?: number; // Rating máximo (1-5)
    page?: number;
    limit?: number;
  } = {},
) => {
  try {
    const params = new URLSearchParams();

    // Arrays: cada elemento se añade como parámetro separado
    // ?category=RPG&category=Acción  (lo que espera el backend con Array.isArray)
    if (filters.category && filters.category.length > 0) {
      filters.category.forEach((cat) => params.append("category", cat));
    }

    // Escalares: solo se añaden si tienen valor definido
    if (filters.search) params.set("search", filters.search);
    if (filters.inStock !== undefined)
      params.set("inStock", String(filters.inStock));
    if (filters.minRating !== undefined)
      params.set("minRating", String(filters.minRating));
    if (filters.maxRating !== undefined)
      params.set("maxRating", String(filters.maxRating));
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));

    const data = await apiClient(`/products?${params.toString()}`, {
      method: "GET",
    });

    return data; // Retorna { products: [], pagination: {} }
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener productos");
  }
};

export const getProductById = async (id: string) => {
  try {
    const data = await apiClient(`/products/${id}`, {
      method: "GET",
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al obtener el producto");
  }
};

//Actualizar un producto ya existente
export const updateProduct = async (
  id: string,
  productData: {
    name: String;
    description: String;
    price: Number;
    category: String[];
    image: String;
    stock: Number;
  },
) => {
  try {
    const data = await apiClient(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al actualizar el producto");
  }
};

/**
 * Envía una calificación y reseña para un producto específico
 * @param id ID del producto
 * @param ratingData Objeto con el valor del rating (1-5) y comentario opcional
 */
export const rateProduct = async (
  id: string,
  ratingData: { rating: number; comment?: string },
) => {
  try {
    const data = await apiClient(`/products/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(ratingData),
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al enviar la calificación");
  }
};

//Eliminar un producto
export const deleteProduct = async (id: string) => {
  try {
    const data = await apiClient(`/products/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Error al eliminar el producto");
  }
};
