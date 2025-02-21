import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { reviewService } from '../../services/reviewService';

const ReviewForm = ({ reservationId, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.create({
        ...formData,
        reservation: reservationId
      });
      setSuccess('Reseña enviada correctamente');
      setError('');
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      setFormData({ rating: 0, comment: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'Error al enviar la reseña');
      setSuccess('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Typography component="legend">Calificación</Typography>
      <Rating
        name="rating"
        value={formData.rating}
        onChange={(event, newValue) => {
          setFormData(prev => ({ ...prev, rating: newValue }));
        }}
        size="large"
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        margin="normal"
        label="Comentario"
        value={formData.comment}
        onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!formData.rating}
      >
        Enviar Reseña
      </Button>
    </Box>
  );
};

export default ReviewForm; 