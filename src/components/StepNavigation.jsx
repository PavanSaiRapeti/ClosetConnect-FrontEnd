import React, { useState } from 'react';

const StepNavigation = ({ steps, currentStep, setCurrentStep }) => {



  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-8 absolute right-2 ">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer transition duration-300 ease-in-out transform ${index <= currentStep ? 'bg-pink-600 text-white border-bg-pink-600 scale-110' : 'bg-white text-ccBlack border-bg-pink-600 hover:scale-105'}`}
              onClick={() => setCurrentStep(index)}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 transition duration-300 ease-in-out ${index < currentStep ? 'bg-pink-600' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>
        <p className="text-gray-700">{steps[currentStep].content}</p>
    </div>
  );
};

export default StepNavigation;