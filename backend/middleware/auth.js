import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
};
