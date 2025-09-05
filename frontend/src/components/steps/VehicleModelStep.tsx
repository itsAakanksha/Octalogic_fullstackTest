import { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Alert, CircularProgress } from '@mui/material';
import FormStep from '../FormStep';
import { useForm } from '../../contexts/FormContext';
import { vehicleService } from '../../services/api';
import type { Vehicle } from '../../types';

export default function VehicleModelStep() {
  const { formData, updateFormData } = useForm();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!formData.vehicleTypeId) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await vehicleService.getVehicles(formData.vehicleTypeId);
        if (response.success) {
          setVehicles(response.data);
        } else {
          setError(response.message || 'Failed to fetch vehicles');
        }
      } catch (err) {
        setError('Failed to fetch vehicles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [formData.vehicleTypeId]);

  const handleVehicleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const vehicleId = parseInt(event.target.value);
    updateFormData({ vehicleId });
  };

  const canProceed = !!formData.vehicleId;

  return (
    <FormStep
      title="Specific Model"
      canProceed={canProceed}
      isLoading={loading}
    >
      <div>
        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center py-6">
            <CircularProgress size={32} sx={{ color: '#ec4899' }} />
          </div>
        ) : (
          <FormControl component="fieldset" className="w-full">
            <RadioGroup
              value={formData.vehicleId?.toString() || ''}
              onChange={handleVehicleChange}
              className="space-y-3"
            >
              {vehicles.map((vehicle) => (
                <FormControlLabel
                  key={vehicle.id}
                  value={vehicle.id.toString()}
                  control={
                    <Radio
                      sx={{
                        color: '#d1d5db',
                        '&.Mui-checked': {
                          color: '#ec4899',
                        },
                        padding: '6px',
                      }}
                    />
                  }
                  label={
                    <div>
                      <span className="text-sm font-medium text-gray-700">{vehicle.modelName}</span>
                      {!vehicle.isAvailable && (
                        <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                          Not Available
                        </span>
                      )}
                    </div>
                  }
                  disabled={!vehicle.isAvailable}
                  className="border border-gray-200 rounded-lg p-3 m-0 hover:bg-gray-50 transition-colors duration-200"
                  sx={{
                    width: '100%',
                    marginLeft: 0,
                    marginRight: 0,
                    borderRadius: '8px',
                    border: formData.vehicleId === vehicle.id ? '1px solid #ec4899' : '1px solid #d1d5db',
                    backgroundColor: formData.vehicleId === vehicle.id ? '#fdf2f8' : 
                                   !vehicle.isAvailable ? '#f9fafb' : 'white',
                    opacity: !vehicle.isAvailable ? 0.6 : 1,
                    '&:hover': {
                      borderColor: formData.vehicleId === vehicle.id ? '#ec4899' : '#9ca3af',
                      backgroundColor: formData.vehicleId === vehicle.id ? '#fdf2f8' : '#f9fafb',
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {!loading && vehicles.length === 0 && !error && (
          <div className="text-center py-6">
            <p className="text-gray-500">No vehicles available for this type</p>
          </div>
        )}
      </div>
    </FormStep>
  );
}
