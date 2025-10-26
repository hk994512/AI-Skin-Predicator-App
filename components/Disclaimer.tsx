
import React from 'react';
import { InformationCircleIcon } from './Icons';

const Disclaimer: React.FC = () => {
  return (
    <div className="mt-8 bg-yellow-50 dark:bg-gray-800 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-6 w-6 text-yellow-400 dark:text-yellow-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
            Important Disclaimer
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-1">
            This AI-powered analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
