import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Divider,
  CircularProgress
} from '@mui/material';
import { reviewService } from '../../services/reviewService';
import ReviewList from '../../components/reviews/ReviewList';

const HotelReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
  }, [id]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewService.getByHotel(id);
      setReviews(response.data);
    } catch (error) {
      setError('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>Reseñas</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Calificación promedio:
          </Typography>
          <Rating
            value={calculateAverageRating()}
            readOnly
            precision={0.5}
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            ({reviews.length} reseñas)
          </Typography>
        </Box>
      </Paper>

      <ReviewList reviews={reviews} />
    </Box>
  );
};

export default HotelReviews; 