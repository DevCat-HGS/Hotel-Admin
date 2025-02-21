import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import { Visibility, Cancel } from '@mui/icons-material';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const response = await userService.getMyReservations();
      setReservations(response.data);
    } catch (error) {
      setError('Error al cargar las reservaciones');
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
      <Typography variant="h4" sx={{ mb: 4 }}>
        Mis Reservaciones
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hotel</TableCell>
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
                <TableCell>{reservation.room.hotel.name}</TableCell>
                <TableCell>{reservation.room.roomNumber}</TableCell>
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
                  <IconButton 
                    onClick={() => navigate(`/reservations/${reservation._id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  {reservation.status === 'pending' && (
                    <IconButton color="error">
                      <Cancel />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyReservations; 