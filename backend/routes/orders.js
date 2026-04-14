import express from "express";
import {
  addOrden,
  getOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/ordersController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, addOrden);

router.get("/my-orders", protect, getOrder);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/status", protect, adminOnly, updateOrder);

export default router;
