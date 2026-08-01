import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { useTheme } from '../../contexts/ThemeContext';
import './CodeEditor.css';

export const CodeEditor = ({ code, language, onChange, readOnly = false }) => {
  const { theme } = useTheme();

  const getLanguageExtensions = () => {
    const exts = [EditorView.lineWrapping];
    if (language === 'html') exts.push(html());
    if (language === 'css' || language === 'scss') exts.push(css());
    return exts;
  };

  return (
    <div className="code-editor-container">
      <CodeMirror
        value={code}
        minHeight="280px"
        theme={theme === 'dark' ? 'dark' : 'light'}
        extensions={getLanguageExtensions()}
        onChange={(val) => onChange && onChange(val)}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightActiveLine: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
