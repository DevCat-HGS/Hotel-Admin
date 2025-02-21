const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Hotel = require('../models/Hotel');

// Obtener todos los hoteles
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener hoteles' });
    }
});

// Obtener un hotel específico
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el hotel' });
    }
});

// Crear un nuevo hotel
router.post('/', auth, async (req, res) => {
    try {
        const hotel = new Hotel({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            amenities: req.body.amenities,
            images: req.body.images
        });
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el hotel' });
    }
});

// Actualizar un hotel
router.put('/:id', auth, async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el hotel' });
    }
});

// Eliminar un hotel
router.delete('/:id', auth, async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        res.json({ message: 'Hotel eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el hotel' });
    }
});

module.exports = router; 