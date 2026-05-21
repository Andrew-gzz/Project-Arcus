import { body, param } from 'express-validator';

export const updateOrderStatusValidator = [
  body('status')
    .notEmpty().withMessage('El estado es requerido')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('El estado debe ser: pending, processing, shipped, delivered o cancelled'),
];

export const getOrderByIdValidator = [
  param('id')
    .notEmpty().withMessage('El ID de la orden es requerido')
    .isMongoId().withMessage('El ID de la orden no es válido'),
];
