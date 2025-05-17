import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import WeightSlider from './WeightSlider';
import { variables, initialWeights, initialCompressionFactor, initialNewSharesTotal } from '../data/directorData';

interface InputFormProps {
  onCalculate: (weights: number[], compressionFactor: number, newSharesTotal: number) => void;
}

const tooltips = {
  "GDP-MER": "Gross Domestic Product at Market Exchange Rates - measures a country's economic output in current US dollars.",
  "GDP-PPP": "Gross Domestic Product at Purchasing Power Parity - adjusts a country's GDP for differences in price levels.",
  "Openness": "Measure of a country's integration with the global economy through trade and financial flows.",
  "Variability": "Reflects the volatility in a country's external receipts and net capital flows.",
  "Reserves": "A country's official reserves including foreign exchange, gold, and SDRs."
};

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const [weights, setWeights] = useState([...initialWeights]);
  const [compressionFactor, setCompressionFactor] = useState(initialCompressionFactor);
  const [newSharesTotal, setNewSharesTotal] = useState(initialNewSharesTotal);
  const [totalWeight, setTotalWeight] = useState(weights.reduce((a, b) => a + b, 0));

  useEffect(() => {
    if (Math.abs(totalWeight - 1) < 0.001) {
      onCalculate(weights, compressionFactor, newSharesTotal);
    }
  }, [weights, compressionFactor, newSharesTotal, totalWeight, onCalculate]);

  const handleWeightChange = (index: number, value: number) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
    setTotalWeight(newWeights.reduce((a, b) => a + b, 0));
  };

  const handleReset = () => {
    setWeights([...initialWeights]);
    setCompressionFactor(initialCompressionFactor);
    setNewSharesTotal(initialNewSharesTotal);
    setTotalWeight(initialWeights.reduce((a, b) => a + b, 0));
    onCalculate(initialWeights, initialCompressionFactor, initialNewSharesTotal);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Adjust Formula Weights</h2>
      
      {variables.map((variable, index) => (
        <WeightSlider 
          key={variable}
          label={variable}
          value={weights[index]}
          onChange={(value) => handleWeightChange(index, value)}
          tooltip={tooltips[variable as keyof typeof tooltips]}
        />
      ))}
      
      <div className={`mt-2 mb-4 text-sm ${Math.abs(totalWeight - 1) < 0.001 ? 'text-green-600' : 'text-red-500'}`}>
        Total weight: {totalWeight.toFixed(2)} {Math.abs(totalWeight - 1) < 0.001 ? '✓' : '(Should sum to 1.00)'}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Compression Factor
        </label>
        <div className="flex">
          <input 
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={compressionFactor}
            onChange={(e) => setCompressionFactor(parseFloat(e.target.value))}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="ml-2 text-sm text-gray-500 flex items-center">
            (0-1)
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Shares to Distribute
        </label>
        <input
          type="number"
          min="1"
          value={newSharesTotal}
          onChange={(e) => setNewSharesTotal(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export default InputForm;
