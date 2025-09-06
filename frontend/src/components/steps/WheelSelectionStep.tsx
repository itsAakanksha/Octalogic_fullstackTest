import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import FormStep from '../FormStep';
import { useForm } from '../../contexts/FormContext';

export default function WheelSelectionStep() {
  const { formData, updateFormData } = useForm();

  const handleWheelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const wheels = parseInt(event.target.value);
    updateFormData({ 
      wheels,
      // Reset dependent fields when wheels change
      vehicleTypeId: null,
      vehicleId: null
    });
  };

  const canProceed = formData.wheels !== null;

  return (
    <FormStep
      title="Number of wheels"
      canProceed={canProceed}
    >
      <FormControl component="fieldset" className="w-full">
        <RadioGroup
          value={formData.wheels?.toString() || ''}
          onChange={handleWheelChange}
          className="space-y-3 gap-2"
        >
          <FormControlLabel
            value="2"
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
              <span className="text-sm font-medium text-gray-700">2 wheels</span>
            }
            className="border border-gray-200 rounded-lg p-2 m-0 hover:bg-gray-50 transition-colors duration-200"
            sx={{
              width: '100%',
              marginLeft: 0,
              marginRight: 0,
              borderRadius: '8px',
              border: formData.wheels === 2 ? '1px solid #ec4899' : '1px solid #d1d5db',
              backgroundColor: formData.wheels === 2 ? '#fdf2f8' : 'white',
              '&:hover': {
                borderColor: formData.wheels === 2 ? '#ec4899' : '#9ca3af',
                backgroundColor: formData.wheels === 2 ? '#fdf2f8' : '#f9fafb',
              }
            }}
          />
          <FormControlLabel
            value="4"
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
              <span className="text-sm font-medium text-gray-700">4 wheels</span>
            }
            className="border border-gray-200 rounded-lg p-2 m-0 hover:bg-gray-50 transition-colors duration-200"
            sx={{
              width: '100%',
              marginLeft: 0,
              marginRight: 0,
              borderRadius: '8px',
              border: formData.wheels === 4 ? '1px solid #ec4899' : '1px solid #d1d5db',
              backgroundColor: formData.wheels === 4 ? '#fdf2f8' : 'white',
              '&:hover': {
                borderColor: formData.wheels === 4 ? '#ec4899' : '#9ca3af',
                backgroundColor: formData.wheels === 4 ? '#fdf2f8' : '#f9fafb',
              }
            }}
          />
        </RadioGroup>
      </FormControl>
    </FormStep>
  );
}
