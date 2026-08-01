import React, { useState } from 'react';
import { CodePlayground } from '../CodePlayground/CodePlayground';
import './ExampleCard.css';

export const ExampleCard = ({ example, isSassMode = false }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="example-card">
      <div className="example-card-header">
        <div className="example-title-area">
          <span className="example-badge">Ví dụ</span>
          <h4 className="example-title">{example.title}</h4>
        </div>
        <button
          className={`toggle-playground-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '▲ Thu gọn Editor' : '▼ Xem Code & Editor'}
        </button>
      </div>

      <p className="example-explanation">{example.explanation}</p>

      {isOpen && (
        <CodePlayground
          exampleId={example.id || example.title}
          initialHtml={example.html || ''}
          initialCss={example.css || ''}
          isSassMode={isSassMode}
        />
      )}

      {example.notes && (
        <div className="example-notes">
          <span className="notes-icon">💡</span>
          <p className="notes-text">{example.notes}</p>
        </div>
      )}
    </div>
  );
};
