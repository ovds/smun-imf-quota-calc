import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} SMUN IMF Quota Calculator</p>
          <p className="mt-1">A tool for calculating IMF quota distributions based on economic indicators</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;