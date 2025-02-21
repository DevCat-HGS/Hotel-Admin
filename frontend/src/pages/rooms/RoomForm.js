import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Chip,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import createRoomService from '../../services/roomService';
import createHotelService from '../../services/hotelService';

const RoomForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAuth();
  const roomService = createRoomService(axios);
  const hotelService = createHotelService(axios);

  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    roomNumber: '',
    hotelId: '',
    type: '',
    price: '',
    capacity: '',
    description: '',
    amenities: [],
    status: 'available',
    images: []
  });
  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    loadHotels();
    if (id) {
      loadRoom();
    }
  }, [id]);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAll();
      setHotels(data || []);
    } catch (error) {
      setError('Error al cargar los hoteles');
    }
  };

  const loadRoom = async () => {
    try {
      const data = await roomService.getOne(id);
      setFormData(data);
    } catch (error) {
      setError('Error al cargar la habitación');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await roomService.update(id, formData);
      } else {
        await roomService.create(formData);
      }
      navigate('/rooms');
    } catch (error) {
      setError('Error al guardar la habitación');
    }
  };

  const roomTypes = ['single', 'double', 'suite', 'deluxe'];
  const statusTypes = ['available', 'occupied', 'maintenance'];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {id ? 'Editar Habitación' : 'Nueva Habitación'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Habitación"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Hotel</InputLabel>
              <Select
                name="hotelId"
                value={formData.hotelId}
                onChange={handleChange}
                label="Hotel"
              >
                {hotels.map((hotel) => (
                  <MenuItem key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Tipo</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Tipo"
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Capacidad"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Estado"
              >
                {statusTypes.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Amenidades
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  label="Nueva amenidad"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                />
                <IconButton onClick={handleAddAmenity}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.amenities.map((amenity, index) => (
                  <Chip
                    key={index}
                    label={amenity}
                    onDelete={() => handleRemoveAmenity(index)}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
          <Button variant="outlined" onClick={() => navigate('/rooms')}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default RoomForm; 