import React, { useState } from 'react';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { LivePreview } from '../LivePreview/LivePreview';
import { CopyButton } from '../CopyButton/CopyButton';
import './CodePlayground.css';

export const CodePlayground = ({
  initialHtml = '',
  initialCss = '',
  isSassMode = false
}) => {
  const [activeTab, setActiveTab] = useState(isSassMode ? 'css' : 'html');
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);

  const handleReset = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
  };

  const currentCodeToCopy = activeTab === 'html' ? htmlCode : cssCode;

  return (
    <div className="code-playground">
      <div className="playground-toolbar">
        <div className="tab-group">
          {!isSassMode && (
            <button
              className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveTab('html')}
            >
              📄 HTML
            </button>
          )}
          <button
            className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            {isSassMode ? '🎨 SCSS' : '🎨 CSS'}
          </button>
        </div>

        <div className="action-group">
          <button
            className="reset-btn"
            onClick={handleReset}
            title="Khôi phục code gốc"
          >
            🔄 Reset
          </button>
          <CopyButton text={currentCodeToCopy} />
        </div>
      </div>

      <div className="playground-body">
        <div className={`playground-editor ${isSassMode ? 'full-width' : ''}`}>
          {activeTab === 'html' && !isSassMode && (
            <CodeEditor
              code={htmlCode}
              language="html"
              onChange={setHtmlCode}
            />
          )}
          {activeTab === 'css' && (
            <CodeEditor
              code={cssCode}
              language={isSassMode ? 'scss' : 'css'}
              onChange={setCssCode}
            />
          )}
        </div>

        {!isSassMode && (
          <div className="playground-preview">
            <LivePreview html={htmlCode} css={cssCode} isSassMode={isSassMode} />
          </div>
        )}
      </div>
    </div>
  );
};
