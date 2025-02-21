const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token, autorización denegada' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

// Middleware para restricción de roles
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'No tienes permiso para realizar esta acción'
            });
        }
        next();
    };
};

module.exports = {
    auth,
    restrictTo
}; 