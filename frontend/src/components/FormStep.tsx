import { Button } from '@mui/material';
import type { ReactNode } from 'react';
import { useForm } from '../contexts/FormContext';

interface FormStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  canProceed: boolean;
  onNext?: () => void;
  isLoading?: boolean;
}

export default function FormStep({ 
  title,
  subtitle,
  children, 
  canProceed, 
  onNext, 
  isLoading = false
}: FormStepProps) {
  const { currentStep, nextStep, prevStep } = useForm();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Navigation */}
      <div className="space-y-4">
        <Button
          variant="contained"
          fullWidth
          disabled={!canProceed || isLoading}
          onClick={handleNext}
          className="h-12 text-base font-semibold"
          sx={{
            backgroundColor: '#ec4899',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.5px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#db2777',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
            },
            '&:disabled': {
              backgroundColor: '#f3f4f6',
              color: '#9ca3af'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {isLoading ? 'Loading...' : 'CONTINUE'}
        </Button>

        {currentStep > 1 && (
          <Button
            variant="text"
            fullWidth
            onClick={prevStep}
            className="h-10 text-sm"
            sx={{
              color: '#6b7280',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#f9fafb',
                color: '#374151'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            ← Back to previous step
          </Button>
        )}
      </div>
    </div>
  );
}
