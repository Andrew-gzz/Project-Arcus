import express from "express";
import {
  addOrden,
  buyNow,
  getOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  cancelOrder,
} from "../controllers/ordersController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  updateOrderStatusValidator,
  getOrderByIdValidator,
  buyNowValidator,
} from "../validators/orderValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

router.post("/", protect, addOrden);

router.post("/buy-now", protect, buyNowValidator, handleValidationErrors, buyNow);

router.get("/my-orders", protect, getOrder);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getOrderByIdValidator, handleValidationErrors, getOrderById);

router.put("/:id/status", protect, adminOnly, updateOrderStatusValidator, handleValidationErrors, updateOrder);

router.delete("/:id", protect, cancelOrder);

export default router;
