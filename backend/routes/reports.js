import express from 'express';
import Order from '../models/Order.js';
import Subscription from '../models/Subscription.js';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/sales-by-category', protect, adminOnly, async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.category',
          totalSales: { $sum: { $multiply: ['$products.quantity', '$products.priceAtPurchase'] } },
          totalQuantity: { $sum: '$products.quantity' }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/top-products', protect, adminOnly, async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.productId',
          totalQuantity: { $sum: '$products.quantity' },
          totalRevenue: { $sum: { $multiply: ['$products.quantity', '$products.priceAtPurchase'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          productId: '$_id',
          name: '$product.name',
          category: '$product.category',
          totalQuantity: 1,
          totalRevenue: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/top-users', protect, adminOnly, async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: '$userId',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$_id',
          username: '$user.username',
          email: '$user.email',
          totalSpent: 1,
          orderCount: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/subscription-stats', protect, adminOnly, async (req, res) => {
  try {
    const byType = await Subscription.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const totalActive = await Subscription.countDocuments({ status: 'active' });
    const totalCancelled = await Subscription.countDocuments({ status: 'cancelled' });

    res.json({
      byType,
      summary: {
        active: totalActive,
        cancelled: totalCancelled
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
