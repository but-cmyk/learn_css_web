import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Tìm kiếm kiến thức (selectors, flexbox, grid, mixin...)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          className="clear-btn"
          onClick={() => onChange('')}
          title="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
    </div>
  );
};
