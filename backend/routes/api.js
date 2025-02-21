const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Importar rutas
const authRoutes = require('./auth');
const hotelRoutes = require('./hotels');
const roomRoutes = require('./rooms');
const reservationRoutes = require('./reservations');
const reviewRoutes = require('./reviews');

// Rutas de autenticación (públicas)
router.use('/auth', authRoutes);

// Rutas protegidas (requieren autenticación)
router.use('/hotels', hotelRoutes);
router.use('/rooms', roomRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reviews', reviewRoutes);

// Ejemplo de ruta con restricción de rol
// router.use('/admin', auth, restrictTo('admin'), require('./admin'));

module.exports = router; 