//backend/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import logger from "../utils/logger.js";

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

    logger.info(`Nuevo usuario registrado: ${email}`);
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
    logger.error(`Error en registerUser: ${error.message}`, { stack: error.stack });
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

    logger.info(`Usuario logueado: ${email}`);
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
    logger.error(`Error en loginUser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cerrar sesión (limpiar cookie)
// @route   POST /api/auth/logout
export const logoutUser = (req, res) => {
  logger.info("Usuario cerró sesión");
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Sesión cerrada" });
};

// @desc    Obtener datos del usuario actual
// @route   GET /api/auth/me
export const getUserProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      type: req.user.type,
    },
  });
};

// @desc    Actualizar perfil del usuario
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "El email ya está en uso" });
      }
      user.email = email;
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "El username ya está en uso" });
      }
      user.username = username;
    }

    await user.save();
    logger.info(`Perfil actualizado: ${user.email}`);
    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
    });
  } catch (error) {
    logger.error(`Error en updateProfile: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cambiar contraseña
// @route   PUT /api/auth/password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Contraseña actual y nueva contraseña son requeridas" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: "La contraseña actual es incorrecta" });
    }

    user.password = newPassword;
    await user.save();

    logger.info(`Contraseña cambiada: ${user.email}`);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    logger.error(`Error en changePassword: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc    Listar todos los usuarios
// @route   GET /api/users
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    logger.error(`Error en listUsers: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc    Eliminar usuario (admin)
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "No puedes eliminar tu propio usuario" });
    }

    await Cart.deleteOne({ userId: user._id });
    await Wishlist.deleteOne({ userId: user._id });
    await user.deleteOne();

    logger.info(`Usuario eliminado por admin: ${user.email}`);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    logger.error(`Error en deleteUser: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
