
import React from 'react';
import { Theme } from '../types';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 transition-transform duration-500 transform rotate-0" />
      ) : (
        <SunIcon className="w-6 h-6 transition-transform duration-500 transform rotate-90" />
      )}
    </button>
  );
};

export default ThemeToggle;
