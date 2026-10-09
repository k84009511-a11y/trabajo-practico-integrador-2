import { body, param } from 'express-validator';
import { validate } from './validate.js';

export const validateArticleId = [
    param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),

    validate
]

export const validateCreateArticle = [
    body('title')
    .trim()
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 200}).withMessage('El titulo debe tener entre 3 y 200 caracteres'),

    body('content')
    .trim()
    .notEmpty().withMessage('El contenido es obligatorio')
    .isLength({ min: 50 }).withMessage('El contenido debe tener un mínimo de 50 caracteres'),
  
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('El extracto no puede superar los 500 caracteres'),
  
  body('status')
    .optional()
    .isIn(['published', 'archived']).withMessage('El estado solo puede ser published o archived'),
  
  validate
]

export const validateUpdateArticle = [
    body('title').optional().trim().isLength({ min: 3, max: 200 }),
    body('content').optional().trim().isLength({ min: 50 }),
    body('excerpt').optional().trim().isLength({ max: 500 }),
    body('status').optional().isIn(['published', 'archived']),
    validate
]