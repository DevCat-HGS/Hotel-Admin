import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import HotelList from './pages/hotels/HotelList';
import HotelForm from './pages/hotels/HotelForm';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReservationList from './pages/reservations/ReservationList';
import ReservationForm from './pages/reservations/ReservationForm';
import Profile from './pages/profile/Profile';
import MyReservations from './pages/profile/MyReservations';
import HotelReviews from './pages/hotels/HotelReviews';
import RoomList from './pages/rooms/RoomList';
import RoomForm from './pages/rooms/RoomForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hotels"
              element={
                <PrivateRoute>
                  <Layout>
                    <HotelList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hotels/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <HotelForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hotels/edit/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <HotelForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/reservations"
              element={
                <PrivateRoute>
                  <Layout>
                    <ReservationList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/reservations/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <ReservationForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/reservations/edit/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <ReservationForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/my-reservations"
              element={
                <PrivateRoute>
                  <Layout>
                    <MyReservations />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/hotels/:id/reviews"
              element={
                <PrivateRoute>
                  <Layout>
                    <HotelReviews />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/rooms"
              element={
                <PrivateRoute>
                  <Layout>
                    <RoomList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/rooms/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <RoomForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/rooms/edit/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <RoomForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 