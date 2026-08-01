import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ContentArea } from './components/ContentArea/ContentArea';
import { allKnowledgeData } from './data';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

const MainLayout = () => {
  const [activeTopicId, setActiveTopicId] = useState('');

  // Flatten all topics for default active topic detection
  const allTopics = useMemo(() => {
    return allKnowledgeData.flatMap(cat => cat.topics);
  }, []);

  // Handle topic selection
  const handleTopicClick = (topicId) => {
    setActiveTopicId(topicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Set default active topic when data loads
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
      <Header />

      <div className="app-body">
        <Sidebar
          categories={allKnowledgeData}
          activeTopicId={activeTopicId}
          onTopicClick={handleTopicClick}
        />

        <ContentArea
          categories={allKnowledgeData}
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
