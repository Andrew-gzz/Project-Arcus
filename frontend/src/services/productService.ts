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

//Obtener lista de productos

export const getProducts = async (
  filters: {
    category?: string[];
    search?: string;
    page?: number;
    limit?: number;
  } = {},
) => {
  try {
    // Convertimos el objeto de filtros en una cadena de texto para la URL
    // Ejemplo: ?category=software&page=1
    const queryParams = new URLSearchParams(filters as any).toString();

    const data = await apiClient(`/products?${queryParams}`, {
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

    return data; // Retorna el mensaje de éxito y los nuevos promedios
  } catch (error: any) {
    // Si el backend lanza el error "Ya has calificado este producto", llegará aquí
    throw new Error(error.message || "Error al enviar la calificación");
  }
};
