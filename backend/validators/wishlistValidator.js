import { body, param } from 'express-validator';

export const addToWishlistValidator = [
  body('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
];

export const removeFromWishlistValidator = [
  param('productId')
    .notEmpty().withMessage('El ID del producto es requerido')
    .isMongoId().withMessage('El ID del producto no es válido'),
];
