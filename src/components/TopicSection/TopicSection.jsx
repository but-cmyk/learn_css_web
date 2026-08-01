import React from 'react';
import { ExampleCard } from '../ExampleCard/ExampleCard';
import './TopicSection.css';

export const TopicSection = ({ topic, isSassMode = false, categoryColor }) => {
  return (
    <section id={topic.id} className="topic-section">
      <div className="topic-header">
        <h3 className="topic-title" style={{ '--cat-accent': categoryColor }}>
          <span className="topic-title-bar"></span>
          {topic.title}
        </h3>
        <p className="topic-description">{topic.description}</p>
      </div>

      <div className="topic-examples">
        {topic.examples.map((example) => (
          <ExampleCard
            key={example.id}
            example={example}
            isSassMode={isSassMode}
          />
        ))}
      </div>
    </section>
  );
};
