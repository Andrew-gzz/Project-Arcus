//backend/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";

// Función helper (privada al controlador)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario o email ya registrado" });
    }

    const user = await User.create({ email, username, password });

    // Crear carritos y wishlists asociados al usuario al registrarse
    await Cart.create({ userId: user._id, products: [] });
    await Wishlist.create({ userId: user._id, products: [] });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Autenticar usuario e iniciar sesión
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cerrar sesión (limpiar cookie)
// @route   POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expira inmediatamente
  });
  res.json({ message: "Sesión cerrada" });
};

// @desc    Obtener datos del usuario actual
// @route   GET /api/auth/me
export const getUserProfile = async (req, res) => {
  // Nota: Asume que el middleware 'protect' ya inyectó a req.user
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      type: req.user.type,
    },
  });
};
