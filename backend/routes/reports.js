import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getSalesByCategory,
  getTopProducts,
  getTopUsers,
  getSubscriptionStats,
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/sales-by-category', protect, adminOnly, getSalesByCategory);

router.get('/top-products', protect, adminOnly, getTopProducts);

router.get('/top-users', protect, adminOnly, getTopUsers);

router.get('/subscription-stats', protect, adminOnly, getSubscriptionStats);

export default router;
