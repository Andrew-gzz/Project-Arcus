//backend/routes/auth.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/authController.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Rutas protegidas
router.get("/me", protect, getUserProfile);

export default router;
