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
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import createReservationService from '../../services/reservationService';
import createRoomService from '../../services/roomService';

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAuth();
  const reservationService = createReservationService(axios);
  const roomService = createRoomService(axios);
  
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    guest: {
      name: '',
      email: '',
      phone: '',
      identification: ''
    },
    roomId: '',
    checkIn: null,
    checkOut: null,
    status: 'pending',
    specialRequests: '',
    totalPrice: 0
  });

  useEffect(() => {
    loadRooms();
    if (id) {
      loadReservation();
    }
  }, [id]);

  const loadRooms = async () => {
    try {
      const data = await roomService.getAll();
      setRooms(data || []);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Error al cargar las habitaciones');
    }
  };

  const loadReservation = async () => {
    try {
      const data = await reservationService.getOne(id);
      setFormData(data);
    } catch (error) {
      setError('Error al cargar la reservación');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await reservationService.update(id, formData);
      } else {
        await reservationService.create(formData);
      }
      navigate('/reservations');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al guardar la reservación');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={3}>
          {id ? 'Editar Reservación' : 'Nueva Reservación'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre del Huésped"
                name="guest.name"
                value={formData.guest.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="guest.email"
                type="email"
                value={formData.guest.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="guest.phone"
                value={formData.guest.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identificación"
                name="guest.identification"
                value={formData.guest.identification}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Habitación</InputLabel>
                <Select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  label="Habitación"
                >
                  {rooms.map((room) => (
                    <MenuItem key={room._id} value={room._id}>
                      {`${room.roomNumber} - ${room.type} - $${room.price}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Estado"
                >
                  <MenuItem value="pending">Pendiente</MenuItem>
                  <MenuItem value="confirmed">Confirmada</MenuItem>
                  <MenuItem value="checked-in">Check-in</MenuItem>
                  <MenuItem value="checked-out">Check-out</MenuItem>
                  <MenuItem value="cancelled">Cancelada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Check-in"
                value={formData.checkIn}
                onChange={handleDateChange('checkIn')}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Check-out"
                value={formData.checkOut}
                onChange={handleDateChange('checkOut')}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Solicitudes Especiales"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            <Button variant="outlined" onClick={() => navigate('/reservations')}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReservationForm; 