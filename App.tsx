
import React, { useState, useEffect, useCallback } from 'react';
import { Theme, AnalysisResult } from './types';
import { analyzeSkinCondition } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Disclaimer from './components/Disclaimer';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setAnalysisResult(null);
    setError(null);
  };
  
  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      // Extract base64 data from the data URL
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.match(/data:(.*);base64,/)?.[1] || 'image/jpeg';
      const result = await analyzeSkinCondition(base64Data, mimeType);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage]);


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ImageUploader onImageSelect={handleImageSelect} selectedImage={selectedImage} />
            <div className="flex flex-col gap-4">
              <button
                onClick={analyzeImage}
                disabled={!selectedImage || isLoading}
                className="w-full bg-primary-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-600 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                 {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Skin Condition'
                )}
              </button>
              <ResultDisplay isLoading={isLoading} result={analysisResult} error={error} />
            </div>
          </div>
          <Disclaimer />
        </div>
      </main>
    </div>
  );
};

export default App;
