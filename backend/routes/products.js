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
import {
  createProductValidator,
  updateProductValidator,
  rateProductValidator,
} from "../validators/productValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

// Rutas Públicas
router.get("/", getProducts);
router.get("/:id", getProductById);

// Rutas Protegidas (Solo Usuarios logeados)
router.post("/:id/reviews", protect, rateProductValidator, handleValidationErrors, rateProduct);

// Rutas Protegidas (Solo para Administradores)
router.post("/", protect, adminOnly, createProductValidator, handleValidationErrors, createProduct);
router.put("/:id", protect, adminOnly, updateProductValidator, handleValidationErrors, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
