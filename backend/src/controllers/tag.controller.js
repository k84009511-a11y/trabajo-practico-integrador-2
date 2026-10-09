import { matchedData } from 'express-validator';
import { Tag } from '../models/tag.model.js';
import { Article } from '../models/article.model.js';

export const createTag = async (req, res) => {
  try {
    const data = matchedData(req);
    const newTag = await Tag.create(data);
    return res.status(201).json(newTag);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la etiqueta', error: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener etiquetas', error: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [{ model: Article, as: 'articles', through: { attributes: [] } }]
    });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la etiqueta', error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await Tag.destroy({ where: { id } });
    return res.status(200).json({ message: 'Etiqueta eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la etiqueta', error: error.message });
  }
};