import { matchedData } from 'express-validator';
import { Article } from '../models/article.model.js';
import { User } from '../models/user.model.js';
import { Tag } from '../models/tag.model.js';


export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req);

    const newArticle = await Article.create({
      ...data,
      userId: req.user.id 
    });

    return res.status(201).json({ message: 'Artículo creado exitosamente', article: newArticle });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el artículo', error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'published' },
      include: [
        { model: User, as: 'author', attributes: ['id', 'username', 'email'] },
        { model: Tag, as: 'tags', through: { attributes: [] } }
      ]
    });

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { userId: req.user.id },
      include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
    });

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener tus artículos', error: error.message });
  }
};

export const getUserArticleById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ['params'] });

    const article = await Article.findOne({
      where: { id, userId: req.user.id },
      include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
    });

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado en tus publicaciones' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el artículo', error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ['params'] });

    const article = await Article.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        { model: Tag, as: 'tags', through: { attributes: [] } }
      ]
    });

    if (!article) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar el artículo', error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ['params'] });
    const data = matchedData(req, { locations: ['body'] });

    const article = await Article.findByPk(id);
    await article.update(data);

    return res.status(200).json({ message: 'Artículo actualizado correctamente', article });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el artículo', error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ['params'] });

    const article = await Article.findByPk(id);
    await article.destroy(); 

    return res.status(200).json({ message: 'Artículo eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el artículo', error: error.message });
  }
};