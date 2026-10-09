import { body, param } from "express-validator";
import { User } from "../models/user.model.js";
import { validate } from "./validate.js";

export const validateUserId = [
    param('id')
    .isInt({ min: 1}).withMessage('El ID debe ser un número entero positivio')
    .customSanitizer(async (id) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('El usuario no existe');
        }
    }),
    validate
];

export const validateCreateUser = [
    body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({ min: 3, max: 20}).withMessage('Debe tener entre 3 y 20 caracteres')
    .isAlphanumeric().withMessage('Solo puede contener letras y números')
    .custom(async (username) => {
        const user = await User.findOne({where: {username}})
        if (user) throw new Error('El username ya está en uso')
    }),

    body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .custom(async (email) => {
        const user = await User.findOne({ where : {email}});
        if (user) throw new Error('El correo ya está registrado')
    }),

    body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('Debe tener un mínimo de 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Debe tener al menos una mayúscula, una minúscula y un número'),

    body('role')
    .optional()
   .isIn(['user', 'admin']).withMessage('El rol debe ser user o admin'),
   
   body('firstName')
   .trim()
   .notEmpty().withMessage('El nombre es obligatorio')
   .isLength({ min: 2, max: 50}).withMessage('debe tener entre 2 y 50 caracteres'),

   body('lastName')
   .trim()
   .notEmpty().withMessage('El apellido es obligatorio')
   .isLength( {min: 2, max: 50}).withMessage('debe tener entre 2 y 50 caracteres'),

   validate
];