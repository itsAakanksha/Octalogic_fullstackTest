import axios from 'axios';
import type { ApiResponse, VehicleType, Vehicle, Booking, BookingRequest, AvailabilityRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const vehicleService = {
  // Get vehicle types by wheel count
  getVehicleTypes: async (wheels?: number): Promise<ApiResponse<VehicleType[]>> => {
    const params = wheels ? { wheels } : {};
    const response = await api.get('/vehicle-types', { params });
    return response.data;
  },

  // Get vehicles by vehicle type
  getVehicles: async (vehicleTypeId: number): Promise<ApiResponse<Vehicle[]>> => {
    const response = await api.get('/vehicles', {
      params: { vehicle_type_id: vehicleTypeId }
    });
    return response.data;
  },

  // Check vehicle availability
  checkAvailability: async (data: AvailabilityRequest): Promise<ApiResponse<{ available: boolean }>> => {
    const response = await api.get('/bookings/check-availability', {
      params: data
    });
    return response.data;
  },

  // Create booking
  createBooking: async (data: BookingRequest): Promise<ApiResponse<Booking>> => {
    const response = await api.post('/bookings', data);
    return response.data;
  },
};

export default api;
