import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { listUsers, deleteUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/", protect, adminOnly, listUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
