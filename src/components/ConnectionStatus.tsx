import React from 'react';

export interface ConnectionStatusProps {
  isConnected: boolean;
  status: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isConnected, 
  status 
}) => {
  return (
    <div className="connection-status">
      <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
        <div className="status-dot"></div>
        <span className="status-text">{status}</span>
      </div>
    </div>
  );
};

export const connectionStatusStyles = `
  .connection-status {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
  
  .status-indicator.connected .status-dot {
    background-color: #28a745;
    box-shadow: 0 0 8px rgba(40, 167, 69, 0.6);
  }
  
  .status-indicator.disconnected .status-dot {
    background-color: #dc3545;
    box-shadow: 0 0 8px rgba(220, 53, 69, 0.6);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  
  .status-text {
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  
  @media (max-width: 768px) {
    .connection-status {
      padding: 6px 12px;
    }
    
    .status-indicator {
      font-size: 11px;
    }
    
    .status-dot {
      width: 6px;
      height: 6px;
    }
  }
`;