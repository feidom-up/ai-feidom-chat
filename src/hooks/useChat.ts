import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';

export const useChat = (): ChatState & { sendMessage: (content: string) => Promise<void> } => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 AI Feidom，很高兴为您服务。请问有什么可以帮助您的吗？',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // 模拟 AI 响应延迟
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // 模拟 AI 响应
      const responses = [
        '这是一个很有趣的问题！让我来为您详细解答...',
        '根据我的理解，您想了解的是...',
        '我很乐意帮助您解决这个问题。',
        '让我来分析一下您的需求...',
        '这确实是一个值得深入讨论的话题。',
        '基于您提供的信息，我建议...',
        '从多个角度来看，这个问题可以这样理解...'
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('发送消息时出现错误，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};