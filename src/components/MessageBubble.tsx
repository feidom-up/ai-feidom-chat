import React from 'react';
import { Message } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AgentMessage } from './AgentMessage';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAgent = message.role === 'agent';
  
  // 如果是Agent消息，使用专门的Agent组件
  if (isAgent && message.agentResponse && message.agentType) {
    return (
      <AgentMessage 
        agentResponse={message.agentResponse}
        agentType={message.agentType}
        timestamp={message.timestamp}
      />
    );
  }
  
  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        <div className="message-content">
          {isUser ? (
            // 用户消息显示为普通文本
            message.content
          ) : (
            // AI 消息使用 Markdown 渲染
            <MarkdownRenderer content={message.content} />
          )}
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
    max-width: 75%;
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
    background: #ffffff;
    color: #333;
    border-bottom-left-radius: 4px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .message-content {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 4px;
  }
  
  .user-bubble .message-content {
    color: white;
  }
  
  .assistant-bubble .message-content {
    color: #333;
  }
  
  /* Markdown 内容在消息气泡中的样式调整 */
  .assistant-bubble .markdown-content {
    color: #333;
  }
  
  .assistant-bubble .markdown-h1,
  .assistant-bubble .markdown-h2,
  .assistant-bubble .markdown-h3,
  .assistant-bubble .markdown-h4 {
    color: #2d3748;
  }
  
  .assistant-bubble .markdown-h1 {
    border-bottom-color: #667eea;
  }
  
  .assistant-bubble .markdown-blockquote {
    background: linear-gradient(90deg, #667eea15 0%, #764ba215 100%);
    border-left-color: #667eea;
  }
  
  .assistant-bubble .markdown-inline-code {
    background: #f8f9fa;
    border-color: #dee2e6;
  }
  
  .assistant-bubble .markdown-table {
    font-size: 0.9em;
  }
  
  .message-time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;
    margin-top: 8px;
  }
  
  .assistant-bubble .message-time {
    color: #666;
  }
  
  .user-bubble .message-time {
    color: rgba(255, 255, 255, 0.8);
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
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .message-bubble {
      max-width: 85%;
      padding: 10px 14px;
    }
    
    .message-content {
      font-size: 14px;
    }
    
    .assistant-bubble .markdown-table {
      font-size: 0.8em;
    }
  }
`;