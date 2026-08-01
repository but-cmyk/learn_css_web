import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ContentArea } from './components/ContentArea/ContentArea';
import { allKnowledgeData } from './data';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

const MainLayout = () => {
  // Sidebar Width state with persistence
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('learn_css_sidebar_width');
    return saved ? parseInt(saved, 10) : 280;
  });

  const [isResizingSidebar, setIsResizingSidebar] = useState(false);

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

  // Sidebar drag resizer logic
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizingSidebar(true);
  };

  useEffect(() => {
    if (!isResizingSidebar) return;

    const handleMouseMove = (e) => {
      const newWidth = Math.min(Math.max(e.clientX, 200), 500);
      setSidebarWidth(newWidth);
      localStorage.setItem('learn_css_sidebar_width', newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        const newWidth = Math.min(Math.max(e.touches[0].clientX, 200), 500);
        setSidebarWidth(newWidth);
        localStorage.setItem('learn_css_sidebar_width', newWidth);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isResizingSidebar]);

  return (
    <div
      className={`app-container ${isResizingSidebar ? 'is-resizing' : ''}`}
      style={{ '--sidebar-width': `${sidebarWidth}px` }}
    >
      <Header />

      <div className="app-body">
        <Sidebar
          categories={allKnowledgeData}
          activeTopicId={activeTopicId}
          onTopicClick={(topicId) => changeActiveTopic(topicId, true)}
        />

        <div
          className={`sidebar-resizer ${isResizingSidebar ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          title="Kéo để chỉnh độ rộng Sidebar"
        >
          <div className="resizer-pill" />
        </div>

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
