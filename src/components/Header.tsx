import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="py-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Monitor className="w-8 h-8 mr-3" />
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            SMUN IMF Quota Calculator
          </motion.h1>
        </div>
        <motion.p 
          className="text-center mt-2 text-blue-100 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Adjust weights and calculate quota distributions for International Monetary Fund directors
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;