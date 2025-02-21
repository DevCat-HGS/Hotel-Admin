const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

// Obtener todas las reservaciones
router.get('/', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('roomId')
            .populate('userId', 'name email');
        res.json(reservations);
    } catch (error) {
        console.error('Error getting reservations:', error);
        res.status(500).json({ message: 'Error al obtener las reservaciones' });
    }
});

// Obtener una reservación específica
router.get('/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('roomId')
            .populate('userId', 'name email');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }
        res.json(reservation);
    } catch (error) {
        console.error('Error getting reservation:', error);
        res.status(500).json({ message: 'Error al obtener la reservación' });
    }
});

// Crear una nueva reservación
router.post('/', auth, async (req, res) => {
    try {
        // Verificar disponibilidad de la habitación
        const room = await Room.findById(req.body.roomId);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        if (room.status !== 'available') {
            return res.status(400).json({ message: 'Habitación no disponible' });
        }

        // Calcular precio total
        const checkIn = new Date(req.body.checkIn);
        const checkOut = new Date(req.body.checkOut);
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = days * room.price;

        const reservation = new Reservation({
            userId: req.user.id,
            roomId: req.body.roomId,
            guest: req.body.guest,
            checkIn: checkIn,
            checkOut: checkOut,
            status: req.body.status || 'pending',
            totalPrice: totalPrice,
            specialRequests: req.body.specialRequests
        });

        await reservation.save();

        // Actualizar estado de la habitación
        room.status = 'occupied';
        await room.save();

        res.status(201).json(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error al crear la reservación' });
    }
});

// Actualizar una reservación
router.put('/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('roomId');
        
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }

        res.json(reservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Error al actualizar la reservación' });
    }
});

// Eliminar una reservación
router.delete('/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservación no encontrada' });
        }

        // Actualizar estado de la habitación
        const room = await Room.findById(reservation.roomId);
        if (room) {
            room.status = 'available';
            await room.save();
        }

        await reservation.remove();
        res.json({ message: 'Reservación eliminada correctamente' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Error al eliminar la reservación' });
    }
});

module.exports = router; 