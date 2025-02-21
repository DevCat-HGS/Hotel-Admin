import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
};

const createReservationService = (axiosInstance) => ({
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/reservations');
      return response.data;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await axiosInstance.get(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getOne:', error);
      throw error;
    }
  },

  create: async (reservationData) => {
    try {
      const response = await axiosInstance.post('/reservations', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },

  update: async (id, reservationData) => {
    try {
      const response = await axiosInstance.put(`/reservations/${id}`, reservationData);
      return response.data;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  },

  checkAvailability: async (roomId, checkIn, checkOut) => {
    try {
      const response = await axiosInstance.post('/reservations/check-availability', {
        roomId,
        checkIn,
        checkOut
      });
      return response.data;
    } catch (error) {
      console.error('Error in checkAvailability:', error);
      throw error;
    }
  }
});

export default createReservationService; 