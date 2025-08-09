import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-bubble">
        <div className="loading-content">
          <div className="typing-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="loading-text">AI 正在思考...</div>
        </div>
      </div>
    </div>
  );
};

export const loadingStyles = `
  .loading-wrapper {
    display: flex;
    justify-content: flex-start;
    margin: 12px 0;
    padding: 0 16px;
  }
  
  .loading-bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 18px;
    background: #f1f3f5;
    border: 1px solid #e9ecef;
    border-bottom-left-radius: 4px;
    animation: fadeIn 0.3s ease-out;
  }
  
  .loading-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .typing-animation {
    display: flex;
    gap: 4px;
  }
  
  .typing-animation span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #667eea;
    animation: bounce 1.4s ease-in-out infinite both;
  }
  
  .typing-animation span:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  .typing-animation span:nth-child(2) {
    animation-delay: -0.16s;
  }
  
  .loading-text {
    font-size: 13px;
    color: #666;
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;