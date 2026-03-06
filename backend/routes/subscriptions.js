import express from 'express';
import Subscription from '../models/Subscription.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { type } = req.body;
    const validTypes = ['start', 'select', 'bonus'];
    
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Tipo de suscripción inválido' });
    }

    const expiration = new Date();
    expiration.setFullYear(expiration.getFullYear() + 1);

    let subscription = await Subscription.findOne({ 
      userId: req.user._id, 
      status: 'active' 
    });

    if (subscription) {
      subscription.type = type;
      subscription.expiration = expiration;
      subscription.status = 'active';
      await subscription.save();
    } else {
      subscription = await Subscription.create({
        userId: req.user._id,
        type,
        expiration,
        status: 'active'
      });
    }
    
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user._id,
      status: 'active'
    });
    
    res.json(subscription || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/cancel', protect, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user._id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ message: 'No tienes suscripción activa' });
    }

    subscription.status = 'cancelled';
    await subscription.save();
    
    res.json({ message: 'Suscripción cancelada', subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
