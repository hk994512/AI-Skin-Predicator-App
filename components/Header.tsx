
import React from 'react';
import { Theme } from '../types';
import ThemeToggle from './ThemeToggle';
import { StethoscopeIcon } from './Icons';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <StethoscopeIcon className="w-8 h-8 text-primary-500" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            AI Skin Disease Detector
          </h1>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
