import { Article } from '../models/article.model.js';
import { Tag } from '../models/tag.model.js';
import { ArticleTag } from '../models/articletag.model.js';

export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.body;

    const article = await Article.findByPk(articleId);
    const tag = await Tag.findByPk(tagId);

    if (!article || !tag) {
      return res.status(404).json({ message: 'Artículo o Etiqueta no encontrada' });
    }

    if (article.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo el autor puede asociar etiquetas' });
    }

    await ArticleTag.create({ articleId, tagId });
    return res.status(201).json({ message: 'Etiqueta agregada al artículo correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al asociar etiqueta', error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleTagId } = req.params;

    const association = await ArticleTag.findByPk(articleTagId);
    if (!association) {
      return res.status(404).json({ message: 'Asociación no encontrada' });
    }

    await association.destroy();
    return res.status(200).json({ message: 'Etiqueta removida del artículo' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al remover etiqueta', error: error.message });
  }
};