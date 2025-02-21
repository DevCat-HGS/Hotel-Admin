import axios from 'axios';

const API_URL = '/hotels';

const createHotelService = (axiosInstance) => ({
    getAll: async () => {
        try {
            const response = await axiosInstance.get('/hotels');
            return response.data;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    },

    getOne: async (id) => {
        try {
            const response = await axiosInstance.get(`/hotels/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error in getOne:', error);
            throw error;
        }
    },

    create: async (hotelData) => {
        try {
            const response = await axiosInstance.post('/hotels', hotelData);
            return response.data;
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    update: async (id, hotelData) => {
        try {
            const response = await axiosInstance.put(`/hotels/${id}`, hotelData);
            return response.data;
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`/hotels/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error in delete:', error);
            throw error;
        }
    }
});

export default createHotelService; 