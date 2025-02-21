import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import createReservationService from '../../services/reservationService';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { axios } = useAuth();
  const reservationService = createReservationService(axios);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await reservationService.getAll();
      setReservations(data || []);
    } catch (error) {
      console.error('Error loading reservations:', error);
      setError('Error al cargar las reservaciones');
    }
  };

  const handleDelete = async (id) => {
    try {
      await reservationService.delete(id);
      loadReservations();
    } catch (error) {
      setError('Error al eliminar la reservación');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'info',
      'checked-in': 'success',
      'checked-out': 'default',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reservaciones</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/reservations/new')}
        >
          Nueva Reservación
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Huésped</TableCell>
              <TableCell>Habitación</TableCell>
              <TableCell>Check-in</TableCell>
              <TableCell>Check-out</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Precio Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation._id}>
                <TableCell>{reservation.guest?.name}</TableCell>
                <TableCell>{reservation.roomId?.roomNumber}</TableCell>
                <TableCell>{formatDate(reservation.checkIn)}</TableCell>
                <TableCell>{formatDate(reservation.checkOut)}</TableCell>
                <TableCell>
                  <Chip
                    label={reservation.status}
                    color={getStatusColor(reservation.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>${reservation.totalPrice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/reservations/${reservation._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/reservations/edit/${reservation._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(reservation._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReservationList; 