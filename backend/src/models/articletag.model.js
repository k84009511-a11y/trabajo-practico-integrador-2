import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ArticleTag = sequelize.define('ArticleTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    articleId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
    tagId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
}, {
  tableName: "article_tags",
  timestamps: true,
  underscored: true
});