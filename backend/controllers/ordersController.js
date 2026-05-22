// backend/controllers/ordersController.js

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import logger from "../utils/logger.js";

//@ desc  Crear orden
//@ route POST api/orders/
//@ access Private
export const addOrden = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId",
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    let total = 0;
    const orderProducts = [];

    for (const item of cart.products) {
      const product = item.productId;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}`,
        });
      }

      total += product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      products: orderProducts,
      total,
      status: "pending",
    });

    for (const item of cart.products) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    cart.products = [];
    await cart.save();

    await order.populate("products.productId");

    logger.info(`Orden creada: ${order._id}, total: ${total}`);
    res.status(201).json(order);
  } catch (error) {
    logger.error(`Error en addOrden: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//@ desc  Obtener orden del usuario
//@ route GET api/orders/my-orders
//@ access Private

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    logger.error(`Error en getOrder: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//@ desc  Obtener ordenes del los usuarios
//@ route GET api/orders/
//@ access Private AdminOnly

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    logger.error(`Error en getAllOrders: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//@ desc  Obtener orden del usuario por id
//@ route GET api/orders/:id
//@ access Private

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.productId")
      .populate("userId", "username email");

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.type !== "admin"
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json(order);
  } catch (error) {
    logger.error(`Error en getOrderById: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//@ desc  Obtener orden del usuario
//@ route PUT api/orders/:id/status
//@ access Private AdminOnly
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json(order);
  } catch (error) {
    logger.error(`Error en updateOrder: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//@ desc  Cancelar orden
//@ route DELETE api/orders/:id
//@ access Private (usuario dueño o admin)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.type !== "admin"
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({ message: "La orden ya está cancelada" });
    }

    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }

    order.status = "cancelled";
    await order.save();

    await order.populate("products.productId");

    logger.info(`Orden cancelada: ${order._id} por usuario ${req.user._id}`);
    res.json({ message: "Orden cancelada correctamente", order });
  } catch (error) {
    logger.error(`Error en cancelOrder: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
