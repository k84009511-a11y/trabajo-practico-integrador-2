import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { User } from "./user.model.js";

export const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    first_name:{
        type:DataTypes.STRING(50),
        allowNull: false,
    },
    last_name:{
        type:DataTypes.STRING(50),
        allowNull: false,
    },
    biography:{
        type:DataTypes.TEXT,
        allowNull: true,
    },
    avatar_url:{
        type:DataTypes.STRING(255),
        allowNull: true,
    },
    birth_date:{
        type:DataTypes.DATE,
        allowNull: true,
    },
}, 
{
    tableName: "profiles",
    timestamps: true,
    underscored: true
});
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });