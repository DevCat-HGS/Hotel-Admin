import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
};

const createRoomService = (axiosInstance) => ({
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/rooms');
      return response.data;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  getByHotel: async (hotelId) => {
    try {
      const response = await axiosInstance.get(`/rooms/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getByHotel:', error);
      throw error;
    }
  },

  getOne: async (id) => {
    try {
      const response = await axiosInstance.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getOne:', error);
      throw error;
    }
  },

  create: async (roomData) => {
    try {
      const response = await axiosInstance.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },

  update: async (id, roomData) => {
    try {
      const response = await axiosInstance.put(`/rooms/${id}`, roomData);
      return response.data;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
});

export default createRoomService; 