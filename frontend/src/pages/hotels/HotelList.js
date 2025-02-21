import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import createHotelService from '../../services/hotelService';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, hotelId: null });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { axios } = useAuth();
  const hotelService = createHotelService(axios);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAll();
      setHotels(data || []); // Aseguramos que hotels sea al menos un array vacío
    } catch (error) {
      console.error('Error loading hotels:', error);
      setError('Error al cargar los hoteles');
    }
  };

  const handleDelete = async () => {
    try {
      await hotelService.delete(deleteDialog.hotelId);
      setDeleteDialog({ open: false, hotelId: null });
      loadHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setError('Error al eliminar el hotel');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Hoteles</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/hotels/new')}
        >
          Nuevo Hotel
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {hotels && hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={hotel.images?.[0]?.url || 'https://via.placeholder.com/300x140'}
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => navigate(`/hotels/edit/${hotel._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => setDeleteDialog({ open: true, hotelId: hotel._id })}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, hotelId: null })}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este hotel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, hotelId: null })}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelList; 