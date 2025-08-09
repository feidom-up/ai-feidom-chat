import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        <div className="message-content">
          {message.content}
        </div>
        <div className="message-time">
          {message.timestamp.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

// CSS styles as a string for easier management
export const messageStyles = `
  .message-wrapper {
    display: flex;
    margin: 12px 0;
    padding: 0 16px;
  }
  
  .message-wrapper.user {
    justify-content: flex-end;
  }
  
  .message-wrapper.assistant {
    justify-content: flex-start;
  }
  
  .message-bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
    word-wrap: break-word;
    animation: fadeIn 0.3s ease-out;
  }
  
  .user-bubble {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-right-radius: 4px;
  }
  
  .assistant-bubble {
    background: #f1f3f5;
    color: #333;
    border-bottom-left-radius: 4px;
    border: 1px solid #e9ecef;
  }
  
  .message-content {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 4px;
  }
  
  .message-time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;
  }
  
  .assistant-bubble .message-time {
    color: #666;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;