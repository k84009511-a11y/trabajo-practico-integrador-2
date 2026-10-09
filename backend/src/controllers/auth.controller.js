import { matchedData } from 'express-validator';
import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';
import { hashedpassword, comparePassword } from '../helpers/bcrypt.helper.js';
import { generateToken } from '../helpers/jwt.helper.js';

export const register = async (req, res) => {
    try{
        const data = matchedData(req);
        const hashedPassword = await hashedpassword(data.password)

        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: 'user',
            profile: {
                first_name: data.firstName,
                last_name: data.lastName
            }
        }, {
            include: [{ model: Profile, as: 'profile'}]
        });

        const userResponse = newUser.toJSON();
        delete userResponse.password;

        return res.status(201).json({ message: 'Registro exitoso', user: userResponse});        
    }catch(error){
        return res.status(500).json({ message: 'Error en el registro', error: error.message})
    } 
}

export const login = async (req, res) => {
    try {
         const {email, password} = req.body;

         const user = await User.findOne({
            where: { email },
            include: [{ model: Profile, as: 'profile'}]
         });

         if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas'});
         }

         const isMatch = await comparePassword(password, user.password);
         if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas'});
         }

         const token = generateToken({ id: user.id, username: user.username, role: user.role});

         res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
         });

         const userResponse = user.toJSON();
         delete userResponse.password;

         return res.status(200).json({ message: 'Login exitoso', user: userResponse});
    }catch{
        return res.status(500).json({ message: 'Error en el login', error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Profile, as:'profile'}]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }

        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({ message: 'Error al obtener el perfil', error: error.message})
    }
};

export const updateProfile = async (req, res) => {
    try {
        const data = matchedData(req);

        const profile = await Profile.findOne({ where: { userId: req.user.id } });

        if(!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        await profile.update(data);
        return res.status(200).json({ message: 'Perfil actualizado correctamente', profile });
    } catch(error) {
        return res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message});
    }
}

export const logout = async (req, res) => {
    try{
        
        res.clearCookie('token')
        return res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al cerrar sesión', error: error.message})
    }
}
