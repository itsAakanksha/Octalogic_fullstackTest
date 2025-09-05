interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Personal Info',
  'Vehicle Category', 
  'Vehicle Type',
  'Select Model',
  'Choose Dates',
  'Confirmation'
];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Desktop Progress Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative px-8">
          {/* Progress Line */}
          <div className="absolute top-4 left-16 right-16 h-0.5 bg-gray-200 z-0 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
          
          {stepLabels.slice(0, totalSteps).map((label, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            
            return (
              <div key={step} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-pink-500 text-white shadow-pink-200'
                      : isActive
                      ? 'bg-pink-500 text-white shadow-pink-200 ring-2 ring-pink-100'
                      : 'bg-white text-gray-400 border border-gray-200 shadow-gray-100'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <div className="mt-3 text-center max-w-20">
                  <div className={`text-xs font-medium leading-tight ${
                    isActive ? 'text-pink-600' : isCompleted ? 'text-pink-500' : 'text-gray-500'
                  }`}>
                    {label}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-medium">
                    Step {step}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-sm text-pink-600 font-medium">
            {stepLabels[currentStep - 1]}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div 
            className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
