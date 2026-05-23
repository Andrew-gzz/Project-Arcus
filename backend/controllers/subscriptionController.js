import Subscription from '../models/Subscription.js';
import logger from '../utils/logger.js';

export const createSubscription = async (req, res) => {
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

    logger.info(`Suscripción creada/actualizada: ${type} para usuario ${req.user._id}`);
    res.status(201).json(subscription);
  } catch (error) {
    logger.error(`Error en createSubscription: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user._id,
      status: 'active'
    });

    res.json(subscription || null);
  } catch (error) {
    logger.error(`Error en getMySubscription: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    logger.error(`Error en getAllSubscriptions: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

export const cancelSubscription = async (req, res) => {
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

    logger.info(`Suscripción cancelada para usuario ${req.user._id}`);
    res.json({ message: 'Suscripción cancelada', subscription });
  } catch (error) {
    logger.error(`Error en cancelSubscription: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
