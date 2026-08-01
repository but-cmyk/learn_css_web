import React, { useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './LivePreview.css';

export const LivePreview = ({ html = '', css = '', isSassMode = false }) => {
  const { theme } = useTheme();

  const srcDoc = useMemo(() => {
    const isDark = theme === 'dark';
    const bgColor = isDark ? '#1a1a2e' : '#ffffff';
    const textColor = isDark ? '#e8e8f0' : '#1a1a2e';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 16px;
              background-color: ${bgColor};
              color: ${textColor};
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  }, [html, css, theme]);

  if (isSassMode) {
    return (
      <div className="live-preview-sass-notice">
        <div className="sass-notice-content">
          <span className="notice-icon">🎨</span>
          <h4>Nội dung SASS / SCSS</h4>
          <p>Phần này tập trung giới thiệu cú pháp SASS (Variables, Mixin, Nesting...). Bạn có thể tham khảo và copy đoạn mã bên trái.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-preview-container">
      <iframe
        title="Live Preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="preview-iframe"
      />
    </div>
  );
};
