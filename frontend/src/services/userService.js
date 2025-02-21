import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
};

export const userService = {
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/profile`, getAuthHeader());
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData, getAuthHeader());
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axios.put(
      `${API_URL}/change-password`,
      passwordData,
      getAuthHeader()
    );
    return response.data;
  },

  getMyReservations: async () => {
    const response = await axios.get(`${API_URL}/my-reservations`, getAuthHeader());
    return response.data;
  }
}; 