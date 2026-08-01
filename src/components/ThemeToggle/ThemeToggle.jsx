import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      title={theme === 'light' ? 'Chuyển sang Dark Mode' : 'Chuyển sang Light Mode'}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span className="theme-icon moon">🌙</span>
      ) : (
        <span className="theme-icon sun">☀️</span>
      )}
    </button>
  );
};
