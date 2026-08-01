import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ContentArea } from './components/ContentArea/ContentArea';
import { allKnowledgeData } from './data';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

const MainLayout = () => {
  // Flatten all topics for default active topic detection
  const allTopics = useMemo(() => {
    return allKnowledgeData.flatMap(cat => cat.topics);
  }, []);

  // Initialize activeTopicId from URL Hash or LocalStorage or Default
  const [activeTopicId, setActiveTopicId] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && allTopics.some(t => t.id === hash)) {
      return hash;
    }
    const savedTopic = localStorage.getItem('learn_css_active_topic');
    if (savedTopic && allTopics.some(t => t.id === savedTopic)) {
      return savedTopic;
    }
    return allTopics[0]?.id || '';
  });

  // Save activeTopicId to localStorage and update URL hash
  const changeActiveTopic = (topicId, shouldScroll = true) => {
    setActiveTopicId(topicId);
    localStorage.setItem('learn_css_active_topic', topicId);
    window.history.replaceState(null, '', `#${topicId}`);
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && allTopics.some(t => t.id === hash)) {
        setActiveTopicId(hash);
        localStorage.setItem('learn_css_active_topic', hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [allTopics]);

  // Ensure activeTopicId is valid if allTopics loads dynamically
  useEffect(() => {
    if (allTopics.length > 0) {
      const exists = allTopics.some(t => t.id === activeTopicId);
      if (!activeTopicId || !exists) {
        changeActiveTopic(allTopics[0].id, false);
      }
    }
  }, [allTopics]);

  return (
    <div className="app-container">
      <Header />

      <div className="app-body">
        <Sidebar
          categories={allKnowledgeData}
          activeTopicId={activeTopicId}
          onTopicClick={(topicId) => changeActiveTopic(topicId, true)}
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
