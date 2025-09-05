import { useForm } from '../contexts/FormContext';
import ProgressIndicator from './ProgressIndicator';
import NameStep from './steps/NameStep';
import WheelSelectionStep from './steps/WheelSelectionStep.tsx';

export default function MultiStepForm() {
  const { currentStep, totalSteps } = useForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NameStep/>
      case 2:
        return <WheelSelectionStep/>
      case 3:
        return "VehicleTypeStep"
      case 4:
        return "VehicleModelStep"
      case 5:
        return "DateRangeStep"
      case 6:
        return "ConfirmationStep"
      default:
        return "Namestep"
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Progress Indicator */}
      <div className="px-4">
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      
      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mx-auto max-w-3xl">
        <div className="p-6 md:p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
