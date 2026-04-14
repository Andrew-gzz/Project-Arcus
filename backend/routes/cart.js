// backend/routes/cart.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  cleanCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove/:productId", protect, deleteFromCart);
router.delete("/clear", protect, cleanCart);

export default router;
