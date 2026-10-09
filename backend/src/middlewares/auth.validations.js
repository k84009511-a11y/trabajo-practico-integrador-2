import { body } from 'express-validator';
import { User } from '../models/user.model.js';
import { validate } from './validate.js';

export const validateRegister = [
    body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isLength( { min: 3, max: 20 }).withMessage('Debe tener entre 3 y 20 caracteres')
    .isAlphanumeric().withMessage('Solo puede contener letras y números')
    .custom(async (username) => {
        const user = await User.findOne({ where: {username} });
        if (user) throw new Error('El username ya está en uso');
    }),

    body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(async (email) => {
        const user = await User.findOne({ where: { email }});
        if (user) throw new Error('El correo ya está registrado');
    }),

    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('Debe contener mínimo 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Debe tener al menos una mayúscula, una minúscula y un número'),

    body('firstName')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('Debe tener entre 2 y 50 caracteres'),

    body('lastName')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('Debe tener entre 2 y 50 caracteres'),

    validate
]

export const validateLogin = [
    body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
    
    validate
]

export const validateUpdateProfile = [
    body('firstName')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ min: 2, max: 50}).withMessage('Debe tener entre 2 y 50 caracteres'),

    body('lastName')
     .optional()
    .trim()
    .notEmpty().withMessage('El apellido no puede estar vacío')
    .isLength({ min: 2, max: 50}).withMessage('Debe tener entre 2 y 50 caracteres'),

    body('biography')
    .optional()
    .isLength({ max: 500}).withMessage('La biografía no puede tener más de 500 caracteres'),

    body('avatarUrl')
    .optional()
    .isURL().withMessage('El avatar debe ser una URL válida'),

    validate
]