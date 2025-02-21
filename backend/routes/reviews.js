const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Review = require('../models/Review');

// Obtener todas las reseñas
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('userId', 'name')
            .populate({
                path: 'hotelId',
                select: 'name'
            });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas' });
    }
});

// Obtener reseñas por hotel
router.get('/hotel/:hotelId', async (req, res) => {
    try {
        const reviews = await Review.find({ hotelId: req.params.hotelId })
            .populate('userId', 'name')
            .populate('reservationId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas del hotel' });
    }
});

// Crear una reseña
router.post('/', auth, async (req, res) => {
    try {
        const { hotelId, reservationId, rating, comment } = req.body;
        const review = new Review({
            userId: req.user.id,
            hotelId,
            reservationId,
            rating,
            comment
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña' });
    }
});

// Actualizar una reseña
router.put('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reseña' });
    }
});

// Eliminar una reseña
router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña' });
    }
});

module.exports = router; 