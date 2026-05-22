import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El formato del email no es válido'),
  body('username')
    .trim()
    .notEmpty().withMessage('El username es requerido')
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres'),
  body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El formato del email no es válido'),
  body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es requerida'),
];

export const updateProfileValidator = [
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('El formato del email no es válido'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('El username debe tener entre 3 y 30 caracteres'),
];

export const changePasswordValidator = [
  body('currentPassword')
    .trim()
    .notEmpty().withMessage('La contraseña actual es requerida'),
  body('newPassword')
    .trim()
    .notEmpty().withMessage('La nueva contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
];
