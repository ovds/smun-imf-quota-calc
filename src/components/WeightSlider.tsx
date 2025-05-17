import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface WeightSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  tooltip: string;
}

const WeightSlider: React.FC<WeightSliderProps> = ({ label, value, onChange, tooltip }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="relative ml-2">
          <HelpCircle 
            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <motion.div 
              className="absolute z-10 w-64 p-2 text-xs bg-gray-800 text-white rounded shadow-lg left-6 top-0"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tooltip}
            </motion.div>
          )}
        </div>
        <span className="ml-auto font-medium text-blue-600">{value.toFixed(2)}</span>
      </div>
      <div className="flex items-center">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
};

export default WeightSlider;