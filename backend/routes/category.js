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

const router = express.Router();

// Ruta pública para que cualquier usuario vea las categorías en el Navbar o Grids
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Rutas protegidas para administración
router.post("/", protect, adminOnly, createCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);
router.put("/:id", protect, adminOnly, updateCategory);

export default router;
