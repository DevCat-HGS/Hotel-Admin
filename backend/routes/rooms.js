const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Room = require('../models/Room');

// Obtener todas las habitaciones
router.get('/', auth, async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate('hotelId', 'name');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones' });
    }
});

// Obtener habitaciones por hotel
router.get('/hotel/:hotelId', auth, async (req, res) => {
    try {
        const rooms = await Room.find({ hotelId: req.params.hotelId })
            .populate('hotelId', 'name');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones del hotel' });
    }
});

// Obtener una habitación específica
router.get('/:id', auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate('hotelId', 'name');
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la habitación' });
    }
});

// Crear una nueva habitación
router.post('/', auth, async (req, res) => {
    try {
        const room = new Room({
            roomNumber: req.body.roomNumber,
            hotelId: req.body.hotelId,
            type: req.body.type,
            price: req.body.price,
            capacity: req.body.capacity,
            amenities: req.body.amenities,
            description: req.body.description,
            images: req.body.images,
            status: req.body.status
        });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la habitación' });
    }
});

// Actualizar una habitación
router.put('/:id', auth, async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la habitación' });
    }
});

// Eliminar una habitación
router.delete('/:id', auth, async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la habitación' });
    }
});

module.exports = router; 