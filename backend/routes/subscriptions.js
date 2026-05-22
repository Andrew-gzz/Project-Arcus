import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  createSubscription,
  getMySubscription,
  getAllSubscriptions,
  cancelSubscription,
} from '../controllers/subscriptionController.js';
import { createSubscriptionValidator } from '../validators/subscriptionValidator.js';
import { handleValidationErrors } from '../middleware/validate.js';

const router = express.Router();

router.post('/', protect, createSubscriptionValidator, handleValidationErrors, createSubscription);

router.get('/my', protect, getMySubscription);

router.get('/', protect, adminOnly, getAllSubscriptions);

router.delete('/cancel', protect, cancelSubscription);

export default router;
