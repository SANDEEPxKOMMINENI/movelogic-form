import React from 'react';
import { useFormStore } from '../store/formStore';
import { Button } from './ui/button';
import { Stars as Stairs, Building2 } from 'lucide-react';

const AddressForm = () => {
  const {
    address,
    floor,
    hasElevator,
    apartmentSize,
    setAddress,
    setFloor,
    setHasElevator,
    setApartmentSize,
    setStep,
  } = useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center mb-6">
        <img src="/src/assets/logo.svg" alt="MoveLogic AI" className="h-12" />
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-2">Apartment Address</h1>
      <p className="text-gray-600 text-center mb-8">Fill in all info correctly</p>
      
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="bg-[#1B365C] text-white py-2 px-4 rounded-t-2xl">
          <span>STEP 3/8</span>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What address are you moving from?
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A99D] focus:border-transparent"
              placeholder="Enter address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stairs or an Elevator needed? <span className="text-gray-500">(choose one)</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setHasElevator(false)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  !hasElevator ? 'border-[#1B365C] bg-[#1B365C] text-white' : 'border-gray-300'
                }`}
              >
                <Stairs className="w-6 h-6 mb-2" />
                <span>STAIRS</span>
              </button>
              <button
                type="button"
                onClick={() => setHasElevator(true)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  hasElevator ? 'border-[#1B365C] bg-[#1B365C] text-white' : 'border-gray-300'
                }`}
              >
                <Building2 className="w-6 h-6 mb-2" />
                <span>ELEVATOR</span>
              </button>
              <button
                type="button"
                onClick={() => setHasElevator(false)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all border-gray-300`}
              >
                <Building2 className="w-6 h-6 mb-2" />
                <span>NOT APPLICABLE</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What floor are you on?
            </label>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A99D] focus:border-transparent"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apartment size <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="flex">
              <input
                type="number"
                value={apartmentSize}
                onChange={(e) => setApartmentSize(Number(e.target.value))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#00A99D] focus:border-transparent"
                placeholder="Enter apartment size"
                min="0"
              />
              <span className="inline-flex items-center px-4 py-2 bg-[#1B365C] text-white rounded-r-lg">
                Sq Meter
              </span>
            </div>
          </div>

          <div className="flex items-center text-[#00A99D] text-sm mb-6">
            <span className="mr-2">✓</span>
            Your info is safe with us! We need details to create the perfect plan for you.
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#00A99D] hover:bg-[#008F84] text-white"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center">
        <button className="text-[#00A99D] text-sm flex items-center justify-center mx-auto">
          <span className="mr-2">?</span>
          Need help? Call us
        </button>
      </div>
    </div>
  );
};

export default AddressForm;