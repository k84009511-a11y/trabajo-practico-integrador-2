import { matchedData } from 'express-validator';
import { hashedpassword } from '../helpers/bcrypt.helper.js';
import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';
import { Article } from '../models/article.model.js';

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, firstName, lastName, biography, avatarUrl, birthDate } = req.body;

    const hashedPassword = await hashedpassword(password)

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
        profile: {
            firstName,
            lastName,
            biography,
            avatarUrl,
            birthDate
        }
    }, {
        include: [{ model: Profile, as: 'profile'}]
    });

    const userResponse = newUser.toJSON();
    delete userResponse.password;

    return res.status(201).json({message: 'Usuario y perfil creados exitosamente', user: userResponse})
    }catch(error){
        return res.status(500).json({message: 'Error al crear usuario', error: error.message})
  }
};

export const getUser = async (req, res) => {
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']},
            include: [{
                model: Profile,
                as: "profile",
            }],
        });

        return res.status(200).json(users)
    } catch(error){
        return res.status(500).json({ 
            message: "Error al obtener usuarios",
            error: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findByPk(id,
            {
                attributes: { exclude: ["password"]},
            include: [ 
            {model: Profile, as: 'profile'},
            {model: Article, as: 'articles'}]
        });

        if (!userFind){
            return res.status(404).json ({ 
                message: "Usuario no encontrado"})
        }

        return res.status(200).json(userFind)
    }catch(error){
        return res.status(500).json ({ 
            message: "Error al buscar el usuario",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const userDell = await User.destroy({ where: { id } })

        if(!userDell){
            return res.status(404).json ({
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({ message: "Usuario eliminado correctamente"})
    }catch(error){
        return res.status(500).json ({
            message: "Error al tratar de eliminar el usuario",
            error: error.message
        })
    }
}
export const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const { username, email, role} = req.body;
        
        const user = await User.findByPk(id)
        if(!user) {
            return res.status(404).json( { message: "Usuario no encontrado"});
        }
        const validatedData = matchedData(req)
        await user.update({ username, email, role});

        return res.status(200).json({message: 'Usuario actualizado correctamente', user})
    }catch(error){
        return res.status(500).json( { message: "Error al actualizar el usuario", error: error.message })
    }
}