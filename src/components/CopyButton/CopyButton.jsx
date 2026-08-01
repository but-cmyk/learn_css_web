import React, { useState } from 'react';
import './CopyButton.css';

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      className={`copy-button ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      title="Copy code"
    >
      {copied ? (
        <>
          <span className="copy-icon">✓</span>
          <span>Đã copy!</span>
        </>
      ) : (
        <>
          <span className="copy-icon">📋</span>
          <span>Copy</span>
        </>
      )}
    </button>
  );
};
