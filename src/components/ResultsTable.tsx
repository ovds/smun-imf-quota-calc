import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { CalculationResult } from '../utils/calculationUtils';

interface ResultsTableProps {
  results: CalculationResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = results.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    if (!results.length) return;
    
    const headers = ["Director Name", "Original Shares", "% of Original Shares", "% of Final Share"];
    const csvContent = [
      headers.join(","),
      ...results.map(row => [
        `"${row.name}"`,
        row.originalShares,
        row.originalPercentage,
        row.finalPercentage
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'imf_quota_calculation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!results.length) {
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600">Click "Calculate" to see results</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mt-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      ref={tableRef}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-800">Calculation Results</h2>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search directors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button 
            onClick={exportCSV}
            className="py-2 px-3 flex items-center text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap"
          >
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Director Name
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Shares
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                % of Original Shares
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                % of Final Share
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((row, index) => (
              <motion.tr 
                key={row.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  {row.originalShares.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  {row.originalPercentage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                  {row.finalPercentage}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ResultsTable;