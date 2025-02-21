import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Avatar,
  Grid,
  Divider
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ReviewItem = ({ review }) => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Grid container spacing={2}>
      <Grid item>
        <Avatar>{review.guest.name[0]}</Avatar>
      </Grid>
      <Grid item xs>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {review.guest.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {format(new Date(review.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
          </Typography>
        </Box>
        <Rating value={review.rating} readOnly size="small" />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {review.comment}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

const ReviewList = ({ reviews }) => {
  if (!reviews?.length) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No hay reseñas disponibles.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </Box>
  );
};

export default ReviewList; 