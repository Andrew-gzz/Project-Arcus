import express from "express";
import {
  addOrden,
  getOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/ordersController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  updateOrderStatusValidator,
  getOrderByIdValidator,
} from "../validators/orderValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

router.post("/", protect, addOrden);

router.get("/my-orders", protect, getOrder);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getOrderByIdValidator, handleValidationErrors, getOrderById);

router.put("/:id/status", protect, adminOnly, updateOrderStatusValidator, handleValidationErrors, updateOrder);

export default router;
