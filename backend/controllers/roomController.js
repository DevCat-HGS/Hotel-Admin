const Room = require('../models/Room');

exports.getAll = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ status: 'success', data: rooms });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.status(200).json({ status: 'success', data: room });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ status: 'success', data: room });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.status(200).json({ status: 'success', data: room });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}; 