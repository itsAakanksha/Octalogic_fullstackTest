import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import FormStep from '../FormStep';
import { useForm } from '../../contexts/FormContext';

export default function NameStep() {
  const { formData, updateFormData, nextStep } = useForm();
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [lastName, setLastName] = useState(formData.lastName || '');
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });

  const validateName = (name: string, field: string) => {
    if (!name.trim()) {
      return `${field} is required`;
    }
    if (name.trim().length < 2) {
      return `${field} must be at least 2 characters`;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return `${field} can only contain letters and spaces`;
    }
    return '';
  };

  const validateForm = () => {
    const firstNameError = validateName(firstName, 'First name');
    const lastNameError = validateName(lastName, 'Last name');
    
    setErrors({
      firstName: firstNameError,
      lastName: lastNameError
    });

    return !firstNameError && !lastNameError;
  };

  const canProceed = firstName.trim().length >= 2 && 
                     lastName.trim().length >= 2 && 
                     /^[a-zA-Z\s]+$/.test(firstName) && 
                     /^[a-zA-Z\s]+$/.test(lastName);

  const handleNext = () => {
    if (validateForm()) {
      updateFormData({ firstName: firstName.trim(), lastName: lastName.trim() });
      nextStep();
    }
  };

  useEffect(() => {
    validateForm();
  }, [firstName, lastName]);

  return (
    <FormStep
      title="What is your name?"
      subtitle="Please enter your full name to begin your vehicle booking"
      canProceed={canProceed}
      onNext={handleNext}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <TextField
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            variant="outlined"
            placeholder="Enter your first name"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ec4899',
                  borderWidth: '2px',
                },
              },
              '& .MuiFormHelperText-root': {
                marginLeft: 0,
                marginTop: '4px',
                fontSize: '12px',
              }
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <TextField
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            variant="outlined"
            placeholder="Enter your last name"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#d1d5db',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ec4899',
                  borderWidth: '2px',
                },
              },
              '& .MuiFormHelperText-root': {
                marginLeft: 0,
                marginTop: '4px',
                fontSize: '12px',
              }
            }}
          />
        </div>
      </div>
    </FormStep>
  );
}
