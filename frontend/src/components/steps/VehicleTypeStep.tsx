import { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Alert, CircularProgress } from '@mui/material';
import FormStep from '../FormStep';
import { useForm } from '../../contexts/FormContext';
import { vehicleService } from '../../services/api';
import type { VehicleType } from '../../types';

export default function VehicleTypeStep() {
  const { formData, updateFormData } = useForm();
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      if (!formData.wheels) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await vehicleService.getVehicleTypes(formData.wheels);
        if (response.success) {
          setVehicleTypes(response.data);
        } else {
          setError(response.message || 'Failed to fetch vehicle types');
        }
      } catch (err) {
        setError('An error occurred while fetching vehicle types');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [formData.wheels]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const vehicleTypeId = parseInt(event.target.value);
    updateFormData({ 
      vehicleTypeId,
      vehicleId: null
    });
  };

  const canProceed = !!formData.vehicleTypeId;

  return (
    <FormStep
      title="Type of vehicle"
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
              value={formData.vehicleTypeId?.toString() || ''}
              onChange={handleTypeChange}
              className="space-y-3 gap-2"
            >
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id.toString()}
                  control={
                    <Radio
                      sx={{
                        color: '#d1d5db',
                        '&.Mui-checked': {
                          color: '#ec4899',
                        },
                        padding: '3px',
                      }}
                    />
                  }
                  label={
                    <span className="text-sm font-medium text-gray-700">{type.name}</span>
                  }
                  className="border border-gray-200 rounded-lg p-2 m-0 hover:bg-gray-50 transition-colors duration-200"
                  sx={{
                    width: '100%',
                    marginLeft: 0,
                    marginRight: 0,
                    borderRadius: '8px',
                    border: formData.vehicleTypeId === type.id ? '1px solid #ec4899' : '1px solid #d1d5db',
                    backgroundColor: formData.vehicleTypeId === type.id ? '#fdf2f8' : 'white',
                    '&:hover': {
                      borderColor: formData.vehicleTypeId === type.id ? '#ec4899' : '#9ca3af',
                      backgroundColor: formData.vehicleTypeId === type.id ? '#fdf2f8' : '#f9fafb',
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {!loading && vehicleTypes.length === 0 && !error && (
          <div className="text-center py-6">
            <p className="text-gray-500">No vehicle types available for {formData.wheels} wheels</p>
          </div>
        )}
      </div>
    </FormStep>
  );
}
