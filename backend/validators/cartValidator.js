import { body, param } from 'express-validator';

export const addToCartValidator = [
  body('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
  body('quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor o igual a 1'),
];

export const updateCartValidator = [
  body('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
  body('quantity')
    .notEmpty().withMessage('La cantidad es requerida')
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0'),
];

export const removeFromCartValidator = [
  param('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
];
