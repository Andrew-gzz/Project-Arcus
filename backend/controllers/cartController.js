import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import logger from "../utils/logger.js";

// @desc Obtener productos del carrito del usuario
// @route Get /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId",
    );

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, products: [] });
    }

    res.json(cart);
  } catch (error) {
    logger.error(`Error en getCart: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc Agregar producto al carrito
// @route POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, products: [] });
    }

    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("products.productId");

    logger.info(`Producto agregado al carrito: ${productId}`);
    res.json(cart);
  } catch (error) {
    logger.error(`Error en addToCart: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc Modificar productos del carrito
// @route PUT /api/cart/update
// @access  Private
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const item = cart.products.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en carrito" });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(
        (item) => item.productId.toString() !== productId,
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("products.productId");

    res.json(cart);
  } catch (error) {
    logger.error(`Error en updateCart: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc Quitar un producto del carrito
// @route DELETE /api/cart/remove/:productId
// @access  Private
export const deleteFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== req.params.productId,
    );

    await cart.save();
    await cart.populate("products.productId");

    res.json(cart);
  } catch (error) {
    logger.error(`Error en deleteFromCart: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc Quitar todo los productos del carrito
// @route DELETE /api/cart/clear
// @access  Private
export const cleanCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { products: [] },
      { new: true },
    );

    res.json(cart);
  } catch (error) {
    logger.error(`Error en cleanCart: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
