const Reservation = require('../models/Reservation');

exports.getAll = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('room');
    res.status(200).json({ status: 'success', data: reservations });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('room');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }
    res.status(200).json({ status: 'success', data: reservation });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ status: 'success', data: reservation });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }
    res.status(200).json({ status: 'success', data: reservation });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}; 