import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';
import { graphqlChatService, GraphQLMessage } from '../services/graphqlChatService';

// 智能回复生成器
class SmartResponseGenerator {
  
  // 将 AI 回复转换为 Markdown 格式
  static convertToMarkdown(response: string, userInput: string): string {
    // 如果回复已经包含 Markdown，直接返回
    if (response.includes('#') || response.includes('**') || response.includes('`') || response.includes('-')) {
      return this.enhanceExistingMarkdown(response, userInput);
    }

    // 将普通文本转换为 Markdown 格式
    return this.formatAsMarkdown(response, userInput);
  }

  // 增强已有的 Markdown 内容
  static enhanceExistingMarkdown(response: string, userInput: string): string {
    let enhanced = response;

    // 确保有合适的标题
    if (!response.startsWith('#')) {
      const topic = this.extractTopic(userInput);
      enhanced = `## 💬 关于${topic}\n\n${enhanced}`;
    }

    // 添加一些视觉元素
    enhanced = this.addVisualElements(enhanced);
    
    return enhanced;
  }

  // 将普通文本格式化为 Markdown
  static formatAsMarkdown(response: string, userInput: string): string {
    const topic = this.extractTopic(userInput);
    const emoji = this.getTopicEmoji(userInput);
    
    // 分段处理
    const paragraphs = response.split('\n\n').filter(p => p.trim());
    
    if (paragraphs.length === 1) {
      // 单段回复
      return `## ${emoji} 关于${topic}\n\n${this.formatParagraph(paragraphs[0])}\n\n---\n\n> 💭 **还有什么想聊的吗？**`;
    }

    // 多段回复
    let formatted = `## ${emoji} 关于${topic}\n\n`;
    
    paragraphs.forEach((paragraph, index) => {
      if (index === 0) {
        formatted += `${this.formatParagraph(paragraph)}\n\n`;
      } else if (index === paragraphs.length - 1) {
        formatted += `### 🤔 我的想法\n\n${this.formatParagraph(paragraph)}\n\n`;
      } else {
        formatted += `${this.formatParagraph(paragraph)}\n\n`;
      }
    });

    formatted += `---\n\n> 💭 **你觉得呢？有什么想法吗？**`;
    
    return formatted;
  }

  // 格式化段落
  static formatParagraph(paragraph: string): string {
    let formatted = paragraph;

    // 强调重要词汇
    formatted = formatted.replace(/\b(重要|关键|特别|非常|确实|当然|必须|应该|可能|也许|或许)\b/g, '**$1**');
    
    // 添加列表格式（如果包含多个要点）
    if (formatted.includes('，') && formatted.includes('、')) {
      const items = formatted.split(/[，、]/).filter(item => item.trim());
      if (items.length >= 3) {
        return items.map(item => `- ${item.trim()}`).join('\n');
      }
    }

    return formatted;
  }

  // 添加视觉元素
  static addVisualElements(content: string): string {
    let enhanced = content;

    // 添加适当的emoji和格式
    enhanced = enhanced.replace(/\b(优点|好处|优势)\b/g, '✅ $1');
    enhanced = enhanced.replace(/\b(缺点|问题|困难)\b/g, '❌ $1');
    enhanced = enhanced.replace(/\b(建议|推荐|建议)\b/g, '💡 $1');
    enhanced = enhanced.replace(/\b(注意|警告|小心)\b/g, '⚠️ $1');
    enhanced = enhanced.replace(/\b(总结|结论)\b/g, '📝 $1');

    return enhanced;
  }

  // 提取话题关键词
  static extractTopic(input: string): string {
    const commonTopics: Record<string, string> = {
      '天气': '天气',
      '吃': '美食',
      '电影': '电影',
      '音乐': '音乐',
      '工作': '工作',
      '学习': '学习',
      '旅行': '旅行',
      '游戏': '游戏',
      '编程': '编程',
      '技术': '技术',
      '生活': '生活',
      '感情': '情感',
      '健康': '健康',
      '运动': '运动',
    };

    for (const [keyword, topic] of Object.entries(commonTopics)) {
      if (input.includes(keyword)) {
        return topic;
      }
    }

    // 如果没有匹配的话题，使用前几个字符
    const words = input.trim().split(/\s+/);
    return words[0]?.substring(0, 4) || '这个话题';
  }

  // 获取话题对应的emoji
  static getTopicEmoji(input: string): string {
    const emojiMap: Record<string, string> = {
      '天气': '🌤️',
      '吃': '🍕',
      '电影': '🎬',
      '音乐': '🎵',
      '工作': '💼',
      '学习': '📚',
      '旅行': '✈️',
      '游戏': '🎮',
      '编程': '💻',
      '技术': '⚡',
      '生活': '🌟',
      '感情': '💝',
      '健康': '🌿',
      '运动': '🏃‍♀️',
    };

    for (const [keyword, emoji] of Object.entries(emojiMap)) {
      if (input.includes(keyword)) {
        return emoji;
      }
    }

    return '💭';
  }

  // 生成系统提示词，确保回复更贴合用户输入
  static generateSystemPrompt(): string {
    return `你是一个友好、智能的AI助手。请遵循以下要求：

1. **紧密关联用户输入**：
   - 仔细理解用户的问题或话题
   - 直接回应用户的关切点
   - 避免答非所问或过于宽泛的回复

2. **回复风格**：
   - 保持友好、自然的语调
   - 适当使用emoji增加亲和力
   - 回复长度适中（100-300字）

3. **内容质量**：
   - 提供有价值的信息或观点
   - 如果是问题，给出实用的建议
   - 如果是聊天，保持对话的趣味性

4. **避免**：
   - 过度重复用户的话
   - 给出模糊或无意义的回复
   - 使用过于正式或生硬的语言

请根据用户的具体输入，给出相关、有用、友好的回复。`;
  }
}

export const useChat = (): ChatState & { sendMessage: (content: string) => Promise<void> } => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `# 👋 你好！我是 AI Feidom 

## 🌟 我已经升级啦！

现在我可以：
- **🧠 更好地理解你的问题**
- **💬 给出更贴合你需求的回复**  
- **📝 保持优雅的 Markdown 格式**

### 💡 试试问我：
- 具体的问题或需要建议
- 想聊的任何话题
- 需要帮助的事情

**我会认真理解你说的每一句话，并给出有用的回复！**

---

> 💭 **那么，今天有什么想聊的吗？**`,
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
      // 准备消息历史
      const conversationHistory: GraphQLMessage[] = [
        {
          role: 'system',
          content: SmartResponseGenerator.generateSystemPrompt()
        },
        // 包含最近3条对话作为上下文
        ...messages.slice(-6).map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: content
        }
      ];

      // 调用 GraphQL AI 服务
      const aiResponse = await graphqlChatService.sendChatMessage(
        conversationHistory,
        {
          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          max_tokens: 800,
          top_p: 0.9
        }
      );

      // 将回复转换为 Markdown 格式
      const markdownResponse = SmartResponseGenerator.convertToMarkdown(
        aiResponse.message.content,
        content
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: markdownResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('发送消息失败:', err);
      
      // 如果 API 调用失败，提供一个智能的降级回复
      const fallbackResponse = `## 😅 哎呀，我遇到了一些技术问题

**关于你刚才说的**"${content}"，我觉得这很有意思！

虽然我现在无法给出最好的回复，但我想说：
- 🤔 你的问题/想法很有价值
- 💭 我正在努力理解和改进
- 🔄 你可以再试一次，或者换个方式表达

### 💡 建议
可以试试：
- 重新发送一遍
- 或者问个更具体的问题
- 又或者我们聊点别的？

---

> 💝 **抱歉让你失望了，我会继续努力的！**`;

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setError('连接服务时遇到问题，但我会继续尝试帮助你！');
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};