//frontend/src/services/productService.ts
import { apiClient } from "../api/client";

// Agregar nuevo producto
export const addProduct = async (productData: {
  name: String;
  description: String;
  price: Number;
  category: String;
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
