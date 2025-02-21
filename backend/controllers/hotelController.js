const Hotel = require('../models/Hotel');

exports.getAll = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ status: 'success', data: hotels });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }
    res.status(200).json({ status: 'success', data: hotel });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ status: 'success', data: hotel });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }
    res.status(200).json({ status: 'success', data: hotel });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}; 