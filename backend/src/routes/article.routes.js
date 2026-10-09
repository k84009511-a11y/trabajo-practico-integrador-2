import { Router } from 'express';
import { 
  createArticle, 
  getArticles, 
  getUserArticles, 
  getUserArticleById, 
  getArticleById, 
  updateArticle, 
  deleteArticle 
} from '../controllers/article.controller.js';
import { authMiddleware, ownerMiddleware } from '../middlewares/auth.middleware.js';
import { 
  validateArticleId, 
  validateCreateArticle, 
  validateUpdateArticle 
} from '../middlewares/article.validations.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validateCreateArticle, createArticle);
router.get('/', getArticles);
router.get('/user', getUserArticles);
router.get('/user/:id', validateArticleId, getUserArticleById);

router.get('/:id', validateArticleId, getArticleById);
router.put('/:id', validateArticleId, ownerMiddleware, validateUpdateArticle, updateArticle);
router.delete('/:id', validateArticleId, ownerMiddleware, deleteArticle);

export default router;