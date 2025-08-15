import { AgentResponse } from './services/agents/agentService';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'agent';
  timestamp: Date;
  // Agent消息的额外信息
  agentResponse?: AgentResponse;
  agentType?: 'docsAgent' | 'weatherAgent';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}