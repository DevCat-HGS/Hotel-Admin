import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  Hotel,
  MeetingRoom,
  BookOnline,
  Star
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, icon, value, link, onClick }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
        {value}
      </Typography>
      <Button variant="contained" onClick={onClick} fullWidth>
        Ver Detalles
      </Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Bienvenido, {user?.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Hoteles"
            icon={<Hotel fontSize="large" color="primary" />}
            value="5"
            onClick={() => navigate('/hotels')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Habitaciones"
            icon={<MeetingRoom fontSize="large" color="primary" />}
            value="25"
            onClick={() => navigate('/rooms')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Reservaciones"
            icon={<BookOnline fontSize="large" color="primary" />}
            value="12"
            onClick={() => navigate('/reservations')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Reseñas"
            icon={<Star fontSize="large" color="primary" />}
            value="48"
            onClick={() => navigate('/reviews')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 