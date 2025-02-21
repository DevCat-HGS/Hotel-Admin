import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import { reservationService } from '../../services/reservationService';
import ReviewForm from '../../components/reviews/ReviewForm';

const ReservationDetail = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReservation();
  }, [id]);

  const loadReservation = async () => {
    try {
      const response = await reservationService.getOne(id);
      setReservation(response.data);
    } catch (error) {
      setError('Error al cargar la reservación');
    }
  };

  const canReview = reservation?.status === 'checked-out';

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Detalles de la Reservación
      </Typography>

      {reservation && (
        <Paper sx={{ p: 3 }}>
          {/* ... detalles de la reservación ... */}

          {canReview && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dejar una Reseña
              </Typography>
              <ReviewForm
                reservationId={id}
                onReviewSubmitted={loadReservation}
              />
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ReservationDetail; 