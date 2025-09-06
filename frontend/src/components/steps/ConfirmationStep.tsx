import { useState, useEffect } from 'react';
import { Button, Alert, Divider, Paper, Chip } from '@mui/material';
import { Calendar, User, Car, Clock, TickCircle } from 'iconsax-react';
import { format } from 'date-fns'; 
import { useForm } from '../../contexts/FormContext';
import { vehicleService } from '../../services/api';
import type { VehicleType, Vehicle } from '../../types';

export default function ConfirmationStep() {
  const { formData, resetForm } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(''); 
  const [bookingId, setBookingId] = useState<number | null>(null); 
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        // Fetch vehicle type
        if (formData.wheels) {
          const vehicleTypesResponse = await vehicleService.getVehicleTypes(formData.wheels);
          if (vehicleTypesResponse.success) {
            const selectedVehicleType = vehicleTypesResponse.data.find(
              (type: VehicleType) => type.id === formData.vehicleTypeId
            );
            setVehicleType(selectedVehicleType || null);
          }
        }

        // Fetch vehicle
        if (formData.vehicleTypeId) {
          const vehiclesResponse = await vehicleService.getVehicles(formData.vehicleTypeId);
          if (vehiclesResponse.success) {
            const selectedVehicle = vehiclesResponse.data.find(
              (v: Vehicle) => v.id === formData.vehicleId
            );
            setVehicle(selectedVehicle || null);
          }
        }
      } catch (err) {
        console.error('Failed to fetch vehicle details:', err);
      }
    };

    fetchVehicleDetails();
  }, [formData.wheels, formData.vehicleTypeId, formData.vehicleId]); 

  const handleSubmit = async () => { 
    if (!formData.vehicleId || !formData.startDate || !formData.endDate) { 
      setError('Missing required information'); 
      return; 
    } 
    
    setIsSubmitting(true); 
    setError(''); 
    
    try { 
      const response = await vehicleService.createBooking({ 
        first_name: formData.firstName, 
        last_name: formData.lastName, 
        vehicle_id: formData.vehicleId, 
        start_date: formData.startDate.toISOString().split('T')[0], 
        end_date: formData.endDate.toISOString().split('T')[0], 
      }); 
      
      if (response.success) { 
        setSuccess(true); 
        setBookingId(response.data.id); 
      } else { 
        setError(response.message || 'Failed to create booking'); 
      } 
    } catch (err) { 
      setError('Failed to create booking. Please try again.'); 
    } finally { 
      setIsSubmitting(false); 
    } 
  }; 

  const handleStartOver = () => { 
    resetForm(); 
    setSuccess(false); 
    setError(''); 
    setBookingId(null); 
  }; 

  const calculateDays = () => { 
    if (!formData.startDate || !formData.endDate) return 0; 
    const diffTime = Math.abs(formData.endDate.getTime() - formData.startDate.getTime()); 
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }; 

  if (success) { 
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <TickCircle size="40" color="green" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Your vehicle rental has been successfully booked.
          </p>
        </div>
        
        {bookingId && (
          <Paper className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-green-700 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-green-800">#{bookingId}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-xs text-green-600 font-medium">Customer</p>
                  <p className="text-sm text-green-800">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">Vehicle</p>
                  <p className="text-sm text-green-800">
                    {vehicle ? vehicle.modelName : 'Vehicle Model'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">Rental Period</p>
                  <p className="text-sm text-green-800">
                    {formData.startDate && formData.endDate 
                      ? `${format(formData.startDate, 'MMM dd')} - ${format(formData.endDate, 'MMM dd, yyyy')}`
                      : 'Date Range'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium">Duration</p>
                  <p className="text-sm text-green-800">{calculateDays()} days</p>
                </div>
              </div>
            </div>
          </Paper>
        )}
        
        <div className="space-y-3">
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleStartOver} 
            className="h-12" 
            sx={{ 
              backgroundColor: '#ec4899', 
              '&:hover': { backgroundColor: '#db2777' } 
            }}
          >
            Book Another Vehicle
          </Button>
          
        
        </div>
      </div>
    ); 
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirm Your Booking
        </h2>
        <p className="text-gray-600">
          Please review your details before completing the reservation
        </p>
      </div>

      {error && (
        <Alert severity="error" className="rounded-lg">
          {error}
        </Alert>
      )}

      <div className="space-y-6">
        <Paper className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User size="32" color="blue" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium text-gray-900">{formData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium text-gray-900">{formData.lastName}</p>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Car size="32" color="purple" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Vehicle Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Chip label={`${formData.wheels} Wheels`} size="small" className="bg-gray-100" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicle Type</p>
              <p className="font-medium text-gray-900">
                {vehicleType ? vehicleType.name : 'Loading...'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-medium text-gray-900">
                {vehicle ? vehicle.modelName : 'Loading...'}
              </p>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar size="32" color="green"  />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Rental Period</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium text-gray-900">
                {formData.startDate ? format(formData.startDate, 'MMM dd, yyyy') : 'Not selected'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium text-gray-900">
                {formData.endDate ? format(formData.endDate, 'MMM dd, yyyy') : 'Not selected'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <p className="font-medium text-gray-900">{calculateDays()} days</p>
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <Divider />

      <div className="space-y-4">
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-12 text-base font-semibold"
          sx={{
            backgroundColor: '#ec4899',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#db2777' },
            '&:disabled': { backgroundColor: '#f3f4f6', color: '#9ca3af' }
          }}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>

       
      </div>
    </div>
  );
}
