import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsTable from './components/ResultsTable';
import Footer from './components/Footer';

import { calculateQuotas } from './utils/calculationUtils';
import { initialWeights, initialCompressionFactor, initialNewSharesTotal } from './data/directorData';

function App() {
  const [results, setResults] = useState(
    calculateQuotas(
      initialWeights,
      initialCompressionFactor,
      initialNewSharesTotal
    )
  );

  const handleCalculate = (
    weights: number[],
    compressionFactor: number,
    newSharesTotal: number
  ) => {
    const newResults = calculateQuotas(
      weights,
      compressionFactor,
      newSharesTotal
    );
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <InputForm onCalculate={handleCalculate} />
            </div>
            <div className="lg:col-span-2">
              <ResultsTable results={results} />
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
