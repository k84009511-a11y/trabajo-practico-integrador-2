import { Router } from 'express';
import { getUser, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { validateUserId, validateCreateUser } from '../middlewares/user.validations.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/', getUser);
router.get('/:id', validateUserId, getUserById);
router.post('/', validateCreateUser, createUser);
router.put('/:id', validateUserId, updateUser);
router.delete('/:id', validateUserId, deleteUser);

export default router;