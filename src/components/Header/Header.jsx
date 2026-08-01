import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import './Header.css';

export const Header = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="logo-icon">🎨</span>
        <h1 className="logo-title">
          Learn<span className="logo-highlight">CSS</span>
        </h1>
        <span className="version-badge">Full Guide</span>
      </div>

      <div className="header-search">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="header-actions">
        <ThemeToggle />
      </div>
    </header>
  );
};
