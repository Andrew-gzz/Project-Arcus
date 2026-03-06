import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id })
      .populate('products.productId');
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, products: [] });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, products: [] });
    }

    const existingItem = cart.products.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate('products.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const item = cart.products.find(
      item => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado en carrito' });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(
        item => item.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('products.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(
      item => item.productId.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate('products.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { products: [] },
      { new: true }
    );
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
