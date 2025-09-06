import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays } from 'date-fns';
import FormStep from '../FormStep';
import { useForm } from '../../contexts/FormContext';
import { vehicleService } from '../../services/api';

export default function DateRangeStep() {
  const { formData, updateFormData } = useForm();
  const [startDate, setStartDate] = useState<Date | null>(formData.startDate);
  const [endDate, setEndDate] = useState<Date | null>(formData.endDate);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const today = new Date();
  const minEndDate = startDate ? addDays(startDate, 1) : addDays(today, 1);

  const checkAvailability = async (start: Date, end: Date) => {
    if (!formData.vehicleId || !start || !end) return;

    setCheckingAvailability(true);
    setAvailabilityError('');
    setIsAvailable(null);

    try {
      const response = await vehicleService.checkAvailability({
        vehicle_id: formData.vehicleId,
        start_date: start.toISOString().split('T')[0],
        end_date: end.toISOString().split('T')[0]
      });

      if (response.success) {
        setIsAvailable(response.data.available);
        if (!response.data.available) {
          setAvailabilityError('Vehicle is not available for the selected dates');
        }
      } else {
        setAvailabilityError(response.message || 'Failed to check availability');
      }
    } catch (err) {
      setAvailabilityError('Failed to check availability. Please try again.');
    } finally {
      setCheckingAvailability(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      checkAvailability(startDate, endDate);
    }
  }, [startDate, endDate, formData.vehicleId]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setIsAvailable(null);
    setAvailabilityError('');
    
    if (date && endDate && date >= endDate) {
      setEndDate(null);
      updateFormData({ startDate: date, endDate: null });
    } else {
      updateFormData({ startDate: date, endDate });
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setIsAvailable(null);
    setAvailabilityError('');
    updateFormData({ startDate, endDate: date });
  };

  const canProceed = startDate && endDate && isAvailable === true && !checkingAvailability;

  return (
    <FormStep
      title="Date range picker"
      canProceed={!!canProceed}
      isLoading={checkingAvailability}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="space-y-6">
          <div>
            <label className="block text-base font-bold text-gray-800 mb-3">
              Start Date:
            </label>
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              minDate={today}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: '48px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ec4899',
                        borderWidth: '2px',
                      },
                    },
                  }
                }
              }}
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-800 mb-3">
              End Date:
            </label>
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              minDate={minEndDate}
              disabled={!startDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: '48px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: startDate ? '#d1d5db' : '#f3f4f6',
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: startDate ? '#9ca3af' : '#f3f4f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ec4899',
                        borderWidth: '2px',
                      },
                    },
                  }
                }
              }}
            />
          </div>

          {availabilityError && (
            <Alert severity="error" sx={{ borderRadius: '12px', fontSize: '16px', py: 2 }}>
              {availabilityError}
            </Alert>
          )}

          {isAvailable === true && startDate && endDate && (
            <Alert severity="success" sx={{ borderRadius: '12px', fontSize: '16px', py: 2 }}>
              Vehicle is available for the selected dates!
            </Alert>
          )}

          {checkingAvailability && (
            <div className="text-center text-gray-600 py-6">
              <div className="text-lg font-medium">Checking availability...</div>
            </div>
          )}
        </div>
      </LocalizationProvider>
    </FormStep>
  );
}
