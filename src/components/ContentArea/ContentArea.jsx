import React from 'react';
import { TopicSection } from '../TopicSection/TopicSection';
import './ContentArea.css';

export const ContentArea = ({ categories, searchQuery, activeTopicId }) => {
  if (categories.length === 0) {
    return (
      <main className="content-area empty">
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>Không tìm thấy kết quả</h3>
          <p>Không tìm thấy chủ đề hoặc ví dụ nào phù hợp với từ khóa "<strong>{searchQuery}</strong>".</p>
        </div>
      </main>
    );
  }

  // SEARCH MODE: render all matching categories & topics
  if (searchQuery && searchQuery.trim() !== '') {
    return (
      <main className="content-area">
        {categories.map((category) => (
          <div key={category.category} className="category-block">
            <div className="category-banner" style={{ '--cat-color': category.categoryColor }}>
              <span className="banner-icon">{category.categoryIcon}</span>
              <div className="banner-info">
                <h2 className="banner-title">{category.categoryTitle}</h2>
                <span className="banner-count">{category.topics.length} chủ đề phù hợp</span>
              </div>
            </div>

            <div className="category-topics">
              {category.topics.map((topic) => (
                <TopicSection
                  key={topic.id}
                  topic={topic}
                  isSassMode={category.category === 'sass'}
                  categoryColor={category.categoryColor}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
    );
  }

  // SINGLE VIEW MODE: find the active category and topic
  let activeCategory = null;
  let activeTopic = null;

  for (const cat of categories) {
    const found = cat.topics.find(t => t.id === activeTopicId);
    if (found) {
      activeCategory = cat;
      activeTopic = found;
      break;
    }
  }

  // Fallback to first if not found
  if (!activeTopic && categories[0]?.topics[0]) {
    activeCategory = categories[0];
    activeTopic = categories[0].topics[0];
  }

  if (!activeTopic) return null;

  return (
    <main className="content-area single-view">
      <div key={activeCategory.category} className="category-block">
        <div className="category-banner" style={{ '--cat-color': activeCategory.categoryColor }}>
          <span className="banner-icon">{activeCategory.categoryIcon}</span>
          <div className="banner-info">
            <h2 className="banner-title">{activeCategory.categoryTitle}</h2>
            <span className="banner-count">Chủ đề: {activeTopic.title}</span>
          </div>
        </div>

        <div className="category-topics">
          <TopicSection
            key={activeTopic.id}
            topic={activeTopic}
            isSassMode={activeCategory.category === 'sass'}
            categoryColor={activeCategory.categoryColor}
          />
        </div>
      </div>
    </main>
  );
};
