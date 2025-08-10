import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';

export const useChat = (): ChatState & { sendMessage: (content: string) => Promise<void> } => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是 **AI Feidom**，很高兴为您服务。\n\n我可以帮助您处理各种问题，包括：\n\n- 📝 文档编写和格式化\n- 💻 代码问题解答\n- 🧮 数学计算\n- 📊 数据分析\n- 🎨 创意思考\n\n请问有什么可以帮助您的吗？',
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

      // 智能 AI 响应，包含 Markdown 格式
      const responses = [
        `## 📚 关于您的问题

这是一个**很有趣**的问题！让我来为您详细解答：

### 主要观点
1. 首先，我们需要理解问题的本质
2. 然后分析可能的解决方案
3. 最后提供具体的建议

> 💡 **提示**: 如果您需要更详细的解释，请随时告诉我！`,

        `## 🎯 我的理解

根据您的描述，我认为您想了解的是：

\`\`\`
核心问题 → 分析思路 → 解决方案
\`\`\`

### 分析步骤
- **步骤1**: 问题识别
- **步骤2**: 数据收集  
- **步骤3**: 方案制定

您觉得这个分析思路如何？`,

        `## 💡 解决方案

我很乐意帮助您解决这个问题！

### 🔍 问题分析
这个问题涉及到几个关键点：

1. **技术层面**: 需要考虑实现的可行性
2. **逻辑层面**: 确保方案的合理性
3. **实用层面**: 保证结果的有效性

### 📋 建议清单
- [ ] 明确目标和期望
- [ ] 收集必要信息
- [ ] 制定执行计划
- [ ] 监控执行效果

**需要我详细说明某个步骤吗？**`,

        `## 🧠 深度分析

让我来分析一下您的需求：

### 📊 数据概览
| 方面 | 重要性 | 复杂度 |
|------|--------|--------|
| 技术实现 | ⭐⭐⭐⭐⭐ | 🔥🔥🔥 |
| 用户体验 | ⭐⭐⭐⭐ | 🔥🔥 |
| 维护成本 | ⭐⭐⭐ | 🔥🔥🔥 |

### 💻 代码示例
\`\`\`javascript
function solveYourProblem(input) {
  // 这里是解决方案的核心逻辑
  const result = processInput(input);
  return optimizeResult(result);
}
\`\`\`

**这样的分析对您有帮助吗？**`,

        `## 🎨 创新思考

这确实是一个**值得深入讨论**的话题！

### 🌟 核心洞察
从多个角度来看，这个问题可以这样理解：

#### 📈 趋势分析
- **短期**: 立即可行的解决方案
- **中期**: 优化和改进空间  
- **长期**: 发展潜力和扩展性

#### 🛠️ 工具推荐
1. **基础工具**: 满足基本需求
2. **进阶工具**: 提升效率
3. **专业工具**: 解决复杂问题

> 💭 **思考**: *"最好的解决方案往往是最简单的方案"*

您希望从哪个角度深入探讨？`,

        `## 📋 综合建议

基于您提供的信息，我的建议如下：

### 🎯 核心要点
- **重点关注**: 确保方案的可执行性
- **注意事项**: 避免过度复杂化
- **成功指标**: 明确衡量标准

### 📚 参考资源
1. **官方文档**: 获取权威信息
2. **社区讨论**: 了解实践经验
3. **案例研究**: 学习成功模式

### ⚡ 快速开始
\`\`\`bash
# 第一步：准备环境
npm install

# 第二步：运行测试
npm test

# 第三步：部署应用
npm run build
\`\`\`

**还有什么其他问题需要我协助解决吗？**`
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