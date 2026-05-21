import { body } from 'express-validator';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre del producto es requerido')
    .isLength({ min: 1, max: 100 }).withMessage('El nombre debe tener entre 1 y 100 caracteres'),
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es requerida'),
  body('price')
    .notEmpty().withMessage('El precio es requerido')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
  body('category')
    .isArray({ min: 1 }).withMessage('La categoría debe ser un arreglo con al menos un elemento'),
  body('category.*')
    .trim()
    .notEmpty().withMessage('El nombre de la categoría no puede estar vacío'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('image')
    .optional()
    .isString().withMessage('La imagen debe ser una cadena de texto'),
];

export const updateProductValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ min: 1, max: 100 }).withMessage('El nombre debe tener entre 1 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('La descripción no puede estar vacía'),
  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
  body('category')
    .optional()
    .isArray({ min: 1 }).withMessage('La categoría debe ser un arreglo con al menos un elemento'),
  body('category.*')
    .trim()
    .notEmpty().withMessage('El nombre de la categoría no puede estar vacío'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('image')
    .optional()
    .isString().withMessage('La imagen debe ser una cadena de texto'),
];

export const rateProductValidator = [
  body('rating')
    .notEmpty().withMessage('El rating es requerido')
    .isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un número entre 1 y 5'),
];
