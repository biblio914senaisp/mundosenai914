
import React from 'react';

interface StepCounterProps {
  steps: number;
  onStep: () => void;
}

const StepCounter: React.FC<StepCounterProps> = ({ steps, onStep }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-500 mb-2">Contador de Passos</h2>
      <p className="text-6xl font-bold text-blue-600 mb-6">{steps}</p>
      <button
        onClick={onStep}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
      >
        Dar um Passo
      </button>
      <p className="text-xs text-gray-400 mt-3">Simule uma caminhada pela escola!</p>
    </div>
  );
};

export default StepCounter;
