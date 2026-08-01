import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ContentArea } from './components/ContentArea/ContentArea';
import { allKnowledgeData } from './data';
import { useSearch } from './hooks/useSearch';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopicId, setActiveTopicId] = useState('');

  const filteredCategories = useSearch(allKnowledgeData, searchQuery);

  // Flatten all topics for default active topic detection
  const allTopics = useMemo(() => {
    return filteredCategories.flatMap(cat => cat.topics);
  }, [filteredCategories]);

  // Handle topic selection
  const handleTopicClick = (topicId) => {
    setActiveTopicId(topicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set default active topic when data loads or search changes
  useEffect(() => {
    if (allTopics.length > 0) {
      const exists = allTopics.some(t => t.id === activeTopicId);
      if (!activeTopicId || !exists) {
        setActiveTopicId(allTopics[0].id);
      }
    }
  }, [allTopics, activeTopicId]);

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="app-body">
        <Sidebar
          categories={filteredCategories}
          activeTopicId={activeTopicId}
          onTopicClick={handleTopicClick}
        />

        <ContentArea
          categories={filteredCategories}
          searchQuery={searchQuery}
          activeTopicId={activeTopicId}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
