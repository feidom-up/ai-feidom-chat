import React from 'react';
import { Bot, ExternalLink, FileText, Cloud, CheckCircle, AlertCircle } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AgentResponse } from '../services/agents/agentService';

interface AgentMessageProps {
  agentResponse: AgentResponse;
  agentType: 'docsAgent' | 'weatherAgent';
  timestamp: Date;
}

export const AgentMessage: React.FC<AgentMessageProps> = ({ 
  agentResponse, 
  agentType, 
  timestamp 
}) => {
  const getAgentIcon = () => {
    switch (agentType) {
      case 'docsAgent':
        return <FileText size={18} />;
      case 'weatherAgent':
        return <Cloud size={18} />;
      default:
        return <Bot size={18} />;
    }
  };

  const getAgentName = () => {
    switch (agentType) {
      case 'docsAgent':
        return '文档分析助手';
      case 'weatherAgent':
        return '天气助手';
      default:
        return 'AI助手';
    }
  };

  const getStatusIcon = () => {
    if (agentResponse.finishReason === 'stop') {
      return <CheckCircle size={14} className="status-success" />;
    }
    return <AlertCircle size={14} className="status-warning" />;
  };

  return (
    <div className="message-wrapper assistant">
      <div className="agent-message-bubble">
        {/* Agent头部信息 */}
        <div className="agent-header">
          <div className="agent-info">
            <div className="agent-icon">
              {getAgentIcon()}
            </div>
            <div className="agent-details">
              <span className="agent-name">{getAgentName()}</span>
              <span className="agent-type">{agentType}</span>
            </div>
          </div>
          <div className="agent-status">
            {getStatusIcon()}
            <span className="status-text">
              {agentResponse.finishReason === 'stop' ? '完成' : '处理中'}
            </span>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="agent-content">
          <MarkdownRenderer content={agentResponse.text} />
        </div>

        {/* 工具调用信息 */}
        {agentResponse.toolCalls && agentResponse.toolCalls.length > 0 && (
          <div className="tool-calls-section">
            <div className="section-title">🔧 使用的工具</div>
            {agentResponse.toolCalls.map((toolCall, index) => (
              <div key={index} className="tool-call-item">
                <ExternalLink size={14} />
                <span>{toolCall.toolName || '工具调用'}</span>
              </div>
            ))}
          </div>
        )}

        {/* 使用统计 */}
        {agentResponse.usage && (
          <div className="usage-stats">
            <div className="usage-item">
              <span className="usage-label">输入Token:</span>
              <span className="usage-value">{agentResponse.usage.promptTokens}</span>
            </div>
            <div className="usage-item">
              <span className="usage-label">输出Token:</span>
              <span className="usage-value">{agentResponse.usage.completionTokens}</span>
            </div>
            <div className="usage-item">
              <span className="usage-label">总计:</span>
              <span className="usage-value">{agentResponse.usage.totalTokens}</span>
            </div>
          </div>
        )}

        {/* 时间戳 */}
        <div className="message-time">
          {timestamp.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

// 样式
export const agentMessageStyles = `
  .agent-message-bubble {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 1px solid #cbd5e0;
    border-radius: 16px;
    padding: 16px;
    margin: 0 16px 12px 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    animation: slideInLeft 0.3s ease-out;
  }

  .agent-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(203, 213, 224, 0.5);
  }

  .agent-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .agent-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .agent-details {
    display: flex;
    flex-direction: column;
  }

  .agent-name {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    line-height: 1.2;
  }

  .agent-type {
    font-size: 11px;
    color: #718096;
    font-family: 'Monaco', 'Menlo', monospace;
  }

  .agent-status {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-success {
    color: #48bb78;
  }

  .status-warning {
    color: #ed8936;
  }

  .status-text {
    font-size: 11px;
    color: #718096;
  }

  .agent-content {
    margin: 12px 0;
    color: #2d3748;
  }

  .tool-calls-section {
    margin: 12px 0;
    padding: 8px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 8px;
    border-left: 3px solid #667eea;
  }

  .section-title {
    font-size: 12px;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }

  .tool-call-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #667eea;
    padding: 2px 0;
  }

  .usage-stats {
    display: flex;
    gap: 12px;
    margin: 12px 0;
    padding: 8px;
    background: rgba(237, 242, 247, 0.7);
    border-radius: 6px;
    font-size: 11px;
  }

  .usage-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .usage-label {
    color: #718096;
  }

  .usage-value {
    color: #2d3748;
    font-weight: 500;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .agent-message-bubble {
      margin: 0 12px 12px 12px;
      padding: 12px;
    }

    .usage-stats {
      flex-direction: column;
      gap: 4px;
    }

    .agent-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .agent-status {
      align-self: flex-end;
    }
  }
`;
