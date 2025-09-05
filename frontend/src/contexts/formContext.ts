import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FormData } from '../types';

interface FormContextType {
  formData: FormData;
  currentStep: number;
  totalSteps: number;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
}

interface FormState {
  formData: FormData;
  currentStep: number;
}

type FormAction =
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'RESET_FORM' };

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  wheels: null,
  vehicleTypeId: null,
  vehicleId: null,
  startDate: null,
  endDate: null,
};

const initialState: FormState = {
  formData: initialFormData,
  currentStep: 1,
};

const TOTAL_STEPS = 6;

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(action.payload, TOTAL_STEPS)),
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const contextValue: FormContextType = {
    formData: state.formData,
    currentStep: state.currentStep,
    totalSteps: TOTAL_STEPS,
    updateFormData: (data: Partial<FormData>) => {
      dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
    },
    nextStep: () => {
      dispatch({ type: 'NEXT_STEP' });
    },
    prevStep: () => {
      dispatch({ type: 'PREV_STEP' });
    },
    goToStep: (step: number) => {
      dispatch({ type: 'GO_TO_STEP', payload: step });
    },
    resetForm: () => {
      dispatch({ type: 'RESET_FORM' });
    },
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
