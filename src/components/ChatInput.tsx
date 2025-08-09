import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "AI 正在思考中..." : "输入消息... (Enter 发送，Shift+Enter 换行)"}
          disabled={disabled}
          rows={1}
          className="chat-input"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          className="send-button"
          type="button"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export const chatInputStyles = `
  .chat-input-container {
    padding: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .chat-input-wrapper {
    display: flex;
    align-items: flex-end;
    background: white;
    border-radius: 24px;
    padding: 8px 8px 8px 16px;
    border: 1px solid #e9ecef;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 100%;
  }
  
  .chat-input {
    flex: 1;
    border: none;
    outline: none;
    resize: none;
    font-size: 15px;
    line-height: 1.4;
    padding: 8px 0;
    font-family: inherit;
    background: transparent;
    min-height: 20px;
    max-height: 120px;
    overflow-y: auto;
  }
  
  .chat-input::placeholder {
    color: #adb5bd;
  }
  
  .chat-input:disabled {
    color: #6c757d;
  }
  
  .send-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: 8px;
    flex-shrink: 0;
  }
  
  .send-button:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .send-button:disabled {
    background: #dee2e6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .send-button:active:not(:disabled) {
    transform: scale(0.95);
  }
`;