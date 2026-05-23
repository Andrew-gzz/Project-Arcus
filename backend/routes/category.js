// backend/routes/category.js
import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
  getCategoryByIdValidator,
  deleteCategoryValidator,
} from "../validators/categoryValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

// Ruta pública para que cualquier usuario vea las categorías en el Navbar o Grids
router.get("/", getCategories);
router.get("/:id", getCategoryByIdValidator, handleValidationErrors, getCategoryById);

// Rutas protegidas para administración
router.post("/", protect, adminOnly, createCategoryValidator, handleValidationErrors, createCategory);
router.delete("/:id", protect, adminOnly, deleteCategoryValidator, handleValidationErrors, deleteCategory);
router.put("/:id", protect, adminOnly, updateCategoryValidator, handleValidationErrors, updateCategory);

export default router;
