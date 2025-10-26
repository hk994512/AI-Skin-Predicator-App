
import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircleIcon, ShieldExclamationIcon } from './Icons';

interface ResultDisplayProps {
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-5/6"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
    </div>
  </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, result, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center text-red-500 flex flex-col items-center gap-2">
            <ShieldExclamationIcon className="w-12 h-12" />
          <p className="font-semibold">Analysis Failed</p>
          <p>{error}</p>
        </div>
      );
    }

    if (result) {
      const confidenceColor = result.confidenceScore > 75 ? 'text-green-500' : result.confidenceScore > 50 ? 'text-yellow-500' : 'text-red-500';

      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-500">{result.diseaseName}</h2>
            <p className={`text-lg font-semibold ${confidenceColor}`}>
              Confidence: {result.confidenceScore}%
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">Description</h3>
            <p className="text-base leading-relaxed">{result.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">Suggested Next Steps</h3>
            <p className="text-base leading-relaxed">{result.recommendedTreatment}</p>
          </div>
        </div>
      );
    }

    return (
        <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-4">
            <CheckCircleIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            <p className="text-lg">Your analysis results will appear here.</p>
            <p>Upload a photo and click "Analyze" to begin.</p>
        </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg min-h-[300px] flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;
