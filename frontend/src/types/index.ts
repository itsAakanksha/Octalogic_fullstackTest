export interface VehicleType {
  id: number;
  name: string;
  wheels: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: number;
  modelName: string;
  vehicleTypeId: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleType?: VehicleType;
}

export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  vehicleId: number;
  startDate: string;
  endDate: string;
  bookingStatus: 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  vehicle?: Vehicle;
}

export interface FormData {
  firstName: string;
  lastName: string;
  wheels: number | null;
  vehicleTypeId: number | null;
  vehicleId: number | null;
  startDate: Date | null;
  endDate: Date | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors: string[] | null;
}

export interface BookingRequest {
  first_name: string;
  last_name: string;
  vehicle_id: number;
  start_date: string;
  end_date: string;
}

export interface AvailabilityRequest {
  vehicle_id: number;
  start_date: string;
  end_date: string;
}
