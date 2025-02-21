import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
};

export const reviewService = {
  getAll: async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  getByHotel: async (hotelId) => {
    const response = await axios.get(`${API_URL}/hotel/${hotelId}`, getAuthHeader());
    return response.data;
  },

  getByReservation: async (reservationId) => {
    const response = await axios.get(`${API_URL}/reservation/${reservationId}`, getAuthHeader());
    return response.data;
  },

  create: async (reviewData) => {
    const response = await axios.post(API_URL, reviewData, getAuthHeader());
    return response.data;
  },

  update: async (id, reviewData) => {
    const response = await axios.put(`${API_URL}/${id}`, reviewData, getAuthHeader());
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  }
}; 