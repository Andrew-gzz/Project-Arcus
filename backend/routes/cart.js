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
import {
  addToCartValidator,
  updateCartValidator,
  removeFromCartValidator,
} from "../validators/cartValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCartValidator, handleValidationErrors, addToCart);
router.put("/update", protect, updateCartValidator, handleValidationErrors, updateCart);
router.delete("/remove/:productId", protect, removeFromCartValidator, handleValidationErrors, deleteFromCart);
router.delete("/clear", protect, cleanCart);

export default router;
