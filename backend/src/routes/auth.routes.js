import { Router } from 'express';
import { register, login, getProfile, updateProfile, logout } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin, validateUpdateProfile } from '../middlewares/auth.validations.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

router.use(authMiddleware);

router.get('/profile', getProfile)
router.put('/profile', validateUpdateProfile, updateProfile)
router.post('/logout', logout);

export default router;
