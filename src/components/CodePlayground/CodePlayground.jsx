import React, { useState } from 'react';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { LivePreview } from '../LivePreview/LivePreview';
import { CopyButton } from '../CopyButton/CopyButton';
import './CodePlayground.css';

export const CodePlayground = ({
  exampleId = '',
  initialHtml = '',
  initialCss = '',
  isSassMode = false
}) => {
  const storageKey = exampleId ? `learn_css_saved_${exampleId}` : null;

  const [activeTab, setActiveTab] = useState(isSassMode ? 'css' : 'html');

  const [htmlCode, setHtmlCode] = useState(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.html !== undefined) return parsed.html;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return initialHtml;
  });

  const [cssCode, setCssCode] = useState(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.css !== undefined) return parsed.css;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return initialCss;
  });

  const [hasSavedData, setHasSavedData] = useState(() => {
    if (storageKey) {
      return !!localStorage.getItem(storageKey);
    }
    return false;
  });

  const [saveStatus, setSaveStatus] = useState('idle');

  const handleSave = () => {
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          html: htmlCode,
          css: cssCode,
          updatedAt: new Date().toISOString()
        }));
        setHasSavedData(true);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (e) {
        console.error('Failed to save code:', e);
      }
    }
  };

  const handleReset = () => {
    setHtmlCode(initialHtml);
    setCssCode(initialCss);
    if (storageKey) {
      localStorage.removeItem(storageKey);
      setHasSavedData(false);
    }
    setSaveStatus('idle');
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
          {hasSavedData && (
            <span className="saved-badge" title="Đã lưu bản nháp tùy chỉnh trên trình duyệt này">
              ● Đã lưu
            </span>
          )}
          <button
            className={`save-btn ${saveStatus === 'saved' ? 'saved' : ''}`}
            onClick={handleSave}
            title="Lưu lại code đã sửa vào trình duyệt"
          >
            {saveStatus === 'saved' ? '✓ Đã lưu!' : '💾 Lưu'}
          </button>
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
