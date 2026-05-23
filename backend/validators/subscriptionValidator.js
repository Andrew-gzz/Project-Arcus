import { body } from 'express-validator';

export const createSubscriptionValidator = [
  body('type')
    .trim()
    .notEmpty().withMessage('El tipo de suscripción es requerido')
    .isIn(['start', 'select', 'bonus'])
    .withMessage('El tipo de suscripción debe ser: start, select o bonus'),
];
