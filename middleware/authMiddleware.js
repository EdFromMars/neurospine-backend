import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
  
  let token = req.query.token || req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
  }

  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
      
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
    
    req.usuario = await Usuario.findById(decoded.id).select('-password -token -confirmado');

    if (!req.usuario) {
      throw new Error('Usuario no encontrado');
    }

    next();
        
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

export default checkAuth;
