import { Router } from 'express';
import { createTag, getTags, getTagById, deleteTag } from '../controllers/tag.controller.js';
import { validateTagId, validateCreateTag } from '../middlewares/tag.validations.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTags);
router.get('/:id', adminMiddleware, validateTagId, getTagById);
router.post('/', adminMiddleware, validateCreateTag, createTag);
router.delete('/:id', adminMiddleware, validateTagId, deleteTag);

export default router;