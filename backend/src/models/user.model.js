import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type:DataTypes.STRING(20),
        unique: {
            msg: 'El nombre de usuario ya está registrado'
        },
        allowNull: false,
        validate: {
            len: {
                args: [3, 20],
                msg: "El nombre de usuario debe contener entre 3 y 20 caracteres"
            }
        }
    },
    email:{
        type:DataTypes.STRING(100),
        unique:{
            msg: 'El correo electrónico ya está registrado'
        },  
        allowNull: false,
        validate: {
            isEmail: {
                msg: "El correo debe ser valido"
            }
        }
    },
    password: {
        type:DataTypes.STRING(255),
        allowNull: false,
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
            allowNull:false
        }
    },
}, {
    tableName: "users",
    paranoid: true,
    timestamps: true,
    underscored: true
});
