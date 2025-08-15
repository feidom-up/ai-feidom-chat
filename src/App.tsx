import React, { useEffect, useRef } from 'react';
import { ChatHeader, chatHeaderStyles } from './components/ChatHeader';
import { MessageBubble, messageStyles } from './components/MessageBubble';
import { ChatInput, chatInputStyles } from './components/ChatInput';
import { LoadingIndicator, loadingStyles } from './components/LoadingIndicator';
import { markdownStyles } from './components/MarkdownRenderer';
import { agentMessageStyles } from './components/AgentMessage';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="app">
      <style>{appStyles + chatHeaderStyles + messageStyles + chatInputStyles + loadingStyles + markdownStyles + agentMessageStyles}</style>
      
      <div className="chat-container">
        <ChatHeader />
        
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && <LoadingIndicator />}
            
            {error && (
              <div className="error-message">
                <div className="error-content">
                  ❌ {error}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

const appStyles = `
  .app {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .chat-container {
    width: 100%;
    max-width: 900px;
    height: 90vh;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .messages-container {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
  
  .messages-list {
    height: 100%;
    overflow-y: auto;
    padding: 16px 0;
    scroll-behavior: smooth;
  }
  
  .messages-list::-webkit-scrollbar {
    width: 6px;
  }
  
  .messages-list::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .messages-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  .messages-list::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  .error-message {
    display: flex;
    justify-content: center;
    margin: 12px 16px;
  }
  
  .error-content {
    background: rgba(248, 215, 218, 0.9);
    color: #721c24;
    padding: 12px 16px;
    border-radius: 18px;
    border: 1px solid rgba(245, 198, 203, 0.8);
    font-size: 14px;
    max-width: 70%;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .app {
      padding: 10px;
    }
    
    .chat-container {
      height: 95vh;
      border-radius: 15px;
      max-width: 100%;
    }
    
    .message-bubble {
      max-width: 85%;
    }
    
    .error-content {
      max-width: 90%;
      font-size: 13px;
    }
  }
`;

export default App;