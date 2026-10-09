import { verifyToken } from '../helpers/jwt.helper.js';
import { Article } from "../models/article.model.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if(!token) {
            return res.status(401).json ({ message: "No autentificado, falta el token"})
        }

    const decoded = verifyToken(token)
    if (!decoded){
        return res.status(401).json({message: 'Token invalido.'})
    }

    req.user = decoded;
    next();
}catch(error){
    return res.status(500).json({ message: 'Error interno en la autentificacion', error: error.message})
  }
};

export const adminMiddleware = (req, res, next) => {
    if(req.user?.role !== 'admin') {
        return res.status(403).json({message: 'Acceso denegado. Se requiere permisos de administrador'})
    }
    next();
}

export const ownerMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);

        if(!article) {
            return res.status(404).json({ message: 'Articulo no encontrado' });
        }

        if (article.userId === req.user.id || req.user.role === 'admin') {
            return next();
        }
        return res.status(403).json({ message: 'Acceso denegado. No eres el propietario de este articulo.' })
    }catch(error) {
        return res.status(500).json({ message: 'Error de autorización', error: error.message})
    }
};