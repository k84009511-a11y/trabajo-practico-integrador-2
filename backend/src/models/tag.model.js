import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    unique:{
      msg:"La etiqueta ya existe"
    },
    allowNull: false,
  },
}, {
  tableName: "tags",
  timestamps: true,
  underscored: true
});