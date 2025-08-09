import { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from '../types';
import { graphqlChatService, GraphQLMessage } from '../services/graphqlChatService';

export const useChat = (): ChatState & { 
  sendMessage: (content: string) => Promise<void>;
  isConnected: boolean;
  connectionStatus: string;
} => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 AI Feidom，一个基于 OpenAI 的智能助手。我已经成功连接到 GraphQL 服务，很高兴为您服务！请问有什么可以帮助您的吗？',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('正在连接...');

  // 检查服务连接状态
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('正在检查服务连接...');
        const healthStatus = await graphqlChatService.checkHealth();
        setIsConnected(true);
        setConnectionStatus(`✅ 已连接 - ${healthStatus}`);
      } catch (err) {
        setIsConnected(false);
        setConnectionStatus(`❌ 连接失败 - ${err instanceof Error ? err.message : '未知错误'}`);
        console.error('服务连接检查失败:', err);
      }
    };

    checkConnection();
  }, []);

  // 将应用消息转换为 GraphQL 格式
  const convertToGraphQLMessages = (appMessages: Message[]): GraphQLMessage[] => {
    // 添加系统消息
    const systemMessage: GraphQLMessage = {
      role: 'system',
      content: '你是 AI Feidom，一个友善、有用的AI助手。请用中文回复，回答要准确、有帮助且富有人性化。'
    };

    // 转换用户和助手消息（排除系统的欢迎消息）
    const userAndAssistantMessages = appMessages
      .filter(msg => msg.id !== '1') // 排除欢迎消息
      .map(msg => ({
        role: msg.role,
        content: msg.content
      })) as GraphQLMessage[];

    return [systemMessage, ...userAndAssistantMessages];
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // 立即添加用户消息
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // 准备发送给 GraphQL 的消息历史
      const currentMessages = [...messages, userMessage];
      const graphqlMessages = convertToGraphQLMessages(currentMessages);

      // 调用真实的 AI API
      const response = await graphqlChatService.sendChatMessage(graphqlMessages, {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      });

      // 创建 AI 响应消息
      const assistantMessage: Message = {
        id: response.id,
        content: response.message.content,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // 更新连接状态
      setIsConnected(true);
      setConnectionStatus(`✅ 已连接 - 模型: ${response.model}`);
      
      // 可选：打印使用统计信息
      if (response.usage) {
        console.log('Token 使用情况:', {
          prompt_tokens: response.usage.prompt_tokens,
          completion_tokens: response.usage.completion_tokens,
          total_tokens: response.usage.total_tokens
        });
      }

    } catch (err) {
      console.error('发送消息失败:', err);
      
      // 处理不同类型的错误
      let errorMessage = '发送消息时出现错误，请稍后重试。';
      
      if (err instanceof Error) {
        if (err.message.includes('OpenAI API key')) {
          errorMessage = '❌ OpenAI API 密钥未配置，请联系管理员。';
          setConnectionStatus('❌ API 密钥未配置');
        } else if (err.message.includes('网络')) {
          errorMessage = '❌ 网络连接失败，请检查网络连接。';
          setConnectionStatus('❌ 网络连接失败');
        } else if (err.message.includes('HTTP错误: 5')) {
          errorMessage = '❌ 服务器暂时不可用，请稍后重试。';
          setConnectionStatus('❌ 服务器错误');
        } else {
          errorMessage = `❌ ${err.message}`;
          setConnectionStatus(`❌ 错误: ${err.message}`);
        }
      }
      
      setError(errorMessage);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isConnected,
    connectionStatus
  };
};