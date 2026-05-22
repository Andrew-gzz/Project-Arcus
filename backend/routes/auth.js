//backend/routes/auth.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { registerValidator, loginValidator, updateProfileValidator, changePasswordValidator } from "../validators/authValidator.js";
import { handleValidationErrors } from "../middleware/validate.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", registerValidator, handleValidationErrors, registerUser);
router.post("/login", loginValidator, handleValidationErrors, loginUser);
router.post("/logout", logoutUser);

// Rutas protegidas
router.get("/me", protect, getUserProfile);
router.put("/profile", protect, updateProfileValidator, handleValidationErrors, updateProfile);
router.put("/password", protect, changePasswordValidator, handleValidationErrors, changePassword);

export default router;
