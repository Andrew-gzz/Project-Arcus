import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Rutas Públicas
router.get("/", getProducts);
router.get("/:id", getProductById);

// Rutas Protegidas (Solo Usuarios logeados)
router.post("/:id/reviews", protect, rateProduct);

// Rutas Protegidas (Solo para Administradores)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
