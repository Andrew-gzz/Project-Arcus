// backend/routes/wishlist.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import {
  addToWishlistValidator,
  removeFromWishlistValidator,
} from "../validators/wishlistValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/add", protect, addToWishlistValidator, handleValidationErrors, addToWishlist);
router.delete("/remove/:productId", protect, removeFromWishlistValidator, handleValidationErrors, removeFromWishlist);

export default router;
