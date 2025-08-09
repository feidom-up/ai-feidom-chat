import React from 'react';
import { Bot, MessageCircle } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="header-icon">
          <Bot size={24} />
        </div>
        <div className="header-text">
          <h1 className="header-title">AI Feidom Chat</h1>
          <p className="header-subtitle">智能助手为您服务</p>
        </div>
      </div>
      <div className="header-status">
        <div className="status-indicator"></div>
        <MessageCircle size={18} />
      </div>
    </div>
  );
};

export const chatHeaderStyles = `
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .header-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-text {
    display: flex;
    flex-direction: column;
  }
  
  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
    line-height: 1.2;
  }
  
  .header-subtitle {
    font-size: 13px;
    color: #666;
    margin: 0;
    line-height: 1.2;
  }
  
  .header-status {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #667eea;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4ade80;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
    }
  }
`;