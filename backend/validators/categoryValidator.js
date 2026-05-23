import { body, param } from 'express-validator';

export const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre de la categoría es requerido')
    .isLength({ min: 1, max: 50 }).withMessage('El nombre debe tener entre 1 y 50 caracteres'),
  body('image')
    .optional()
    .isString().withMessage('La imagen debe ser una cadena de texto'),
];

export const updateCategoryValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ min: 1, max: 50 }).withMessage('El nombre debe tener entre 1 y 50 caracteres'),
  body('image')
    .optional()
    .isString().withMessage('La imagen debe ser una cadena de texto'),
];

export const getCategoryByIdValidator = [
  param('id')
    .notEmpty().withMessage('El ID de la categoría es requerido')
    .isMongoId().withMessage('El ID de la categoría no es válido'),
];

export const deleteCategoryValidator = [
  param('id')
    .notEmpty().withMessage('El ID de la categoría es requerido')
    .isMongoId().withMessage('El ID de la categoría no es válido'),
];
