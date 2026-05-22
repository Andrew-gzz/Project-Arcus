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

export const buyNowValidator = [
  body('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
  body('quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1'),
];
