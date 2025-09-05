import { FormProvider } from './contexts/FormContext';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header Section */}
        <div className="pt-8 pb-6 w-full">
          <div className="mx-auto  px-6">
            <div className="text-center w-full space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Vehicle Rental Booking
              </h1>
              <p className="text-gray-600 text-base md:text-lg font-light mx-auto leading-relaxed">
                Complete the form below to reserve your vehicle
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-6 pb-12">
          <div className="w-full max-w-4xl">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
