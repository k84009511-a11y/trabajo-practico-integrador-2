import { body, param } from 'express-validator';
import { Tag } from '../models/tag.model.js';
import { validate } from './validate.js';

export const validateTagId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un entero positivo')
    .custom(async (id) => {
      const tag = await Tag.findByPk(id);
      if (!tag) throw new Error('La etiqueta especificada no existe');
    }),
  validate
];

export const validateCreateTag = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 30 }).withMessage('Entre 2 y 30 caracteres')
    .custom(async (name) => {
      const tag = await Tag.findOne({ where: { name } });
      if (tag) throw new Error('La etiqueta ya existe');
    }),
  validate
];