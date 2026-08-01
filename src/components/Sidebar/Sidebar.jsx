import React, { useState } from 'react';
import './Sidebar.css';

export const Sidebar = ({ categories, activeTopicId, onTopicClick }) => {
  // Collapse state for each category (default expanded)
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {categories.map((category) => {
          const isCollapsed = collapsedCategories[category.category];

          return (
            <div key={category.category} className="sidebar-category">
              <button
                className="category-header"
                onClick={() => toggleCategory(category.category)}
              >
                <span className="category-icon">{category.categoryIcon}</span>
                <span
                  className="category-title"
                  style={{ '--cat-color': category.categoryColor }}
                >
                  {category.categoryTitle}
                </span>
                <span className="category-count">{category.topics.length}</span>
                <span className={`category-arrow ${isCollapsed ? 'collapsed' : ''}`}>
                  ▾
                </span>
              </button>

              {!isCollapsed && (
                <ul className="topic-list">
                  {category.topics.map((topic) => {
                    const isActive = activeTopicId === topic.id;
                    return (
                      <li key={topic.id}>
                        <button
                          className={`topic-item ${isActive ? 'active' : ''}`}
                          onClick={() => onTopicClick(topic.id)}
                          style={{
                            '--topic-accent': category.categoryColor
                          }}
                        >
                          <span className="topic-dot"></span>
                          <span className="topic-name">{topic.title}</span>
                          <span className="example-count">{topic.examples.length}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
