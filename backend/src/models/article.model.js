import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.model.js';
import { Tag } from './tag.model.js'
import { ArticleTag } from './articletag.model.js'


export const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: {
        args: [3, 200],
        msg: "El título debe contener entre 3 y 200 caracteres"
      }
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [50, 10000], 
        msg: "El contenido debe tener como mínimo 50 caracteres"
      }
    }
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('published', 'archived'),
    defaultValue: 'published',
    allowNull: false,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
     }
}, {
  tableName: "articles",
  timestamps: true,
  paranoid: true,  
  underscored: true
});

User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'userId', as: 'author' });

Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: 'articleId',   as: 'tags',});
Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: 'tagId', as: 'articles' });