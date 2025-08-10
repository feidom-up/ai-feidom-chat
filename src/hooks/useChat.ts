import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';

// AI 回答生成器
class AIResponseGenerator {
  // 检测问题类型
  static detectQuestionType(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('代码') || lowerInput.includes('编程') || lowerInput.includes('函数') || 
        lowerInput.includes('bug') || lowerInput.includes('调试') || /\b(js|javascript|python|react|vue|html|css)\b/.test(lowerInput)) {
      return 'code';
    }
    
    if (lowerInput.includes('数学') || lowerInput.includes('计算') || lowerInput.includes('公式') ||
        /\d+[\+\-\*\/]\d+/.test(input) || lowerInput.includes('求解')) {
      return 'math';
    }
    
    if (lowerInput.includes('解释') || lowerInput.includes('是什么') || lowerInput.includes('什么是') ||
        lowerInput.includes('定义') || lowerInput.includes('概念')) {
      return 'explanation';
    }
    
    if (lowerInput.includes('怎么') || lowerInput.includes('如何') || lowerInput.includes('方法') ||
        lowerInput.includes('步骤') || lowerInput.includes('教程')) {
      return 'howto';
    }
    
    if (lowerInput.includes('比较') || lowerInput.includes('对比') || lowerInput.includes('区别') ||
        lowerInput.includes('优缺点') || lowerInput.includes('vs')) {
      return 'comparison';
    }
    
    if (lowerInput.includes('推荐') || lowerInput.includes('建议') || lowerInput.includes('选择') ||
        lowerInput.includes('哪个好') || lowerInput.includes('最佳')) {
      return 'recommendation';
    }
    
    if (lowerInput.includes('创意') || lowerInput.includes('想法') || lowerInput.includes('头脑风暴') ||
        lowerInput.includes('设计') || lowerInput.includes('方案')) {
      return 'creative';
    }
    
    return 'general';
  }

  // 生成不同类型的回答
  static generateResponse(input: string, type: string): string {
    const responses = {
      code: [
        `## 💻 代码解决方案

让我来帮您解决这个编程问题！

### 🔍 问题分析
基于您的描述，这个问题涉及到：

\`\`\`javascript
// 示例解决方案
function solveProblem(input) {
  // 核心逻辑实现
  const result = processInput(input);
  
  // 错误处理
  if (!result) {
    throw new Error('处理失败');
  }
  
  return result;
}

// 使用示例
try {
  const output = solveProblem(yourInput);
  console.log('结果:', output);
} catch (error) {
  console.error('错误:', error.message);
}
\`\`\`

### 📋 实现步骤
1. **分析需求**: 明确功能要求
2. **设计架构**: 规划代码结构
3. **编写代码**: 实现核心逻辑
4. **测试验证**: 确保功能正确

### 🛠️ 最佳实践
- ✅ 使用清晰的变量命名
- ✅ 添加适当的注释
- ✅ 进行错误处理
- ✅ 编写单元测试

需要我详细解释某个部分吗？`,

        `## 🚀 编程指导

这是一个很好的编程问题！让我为您提供详细的解决思路：

### 🎯 核心思路
\`\`\`
输入 → 处理 → 验证 → 输出
\`\`\`

### 📊 代码架构
\`\`\`typescript
interface Solution {
  input: any;
  process(): any;
  validate(): boolean;
  output(): any;
}

class ProblemSolver implements Solution {
  constructor(private input: any) {}
  
  process() {
    // 主要处理逻辑
    return this.input.map(item => this.transform(item));
  }
  
  validate() {
    // 验证结果
    return this.input && this.input.length > 0;
  }
  
  output() {
    if (this.validate()) {
      return this.process();
    }
    throw new Error('Invalid input');
  }
}
\`\`\`

### 🐛 常见陷阱
| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 空指针异常 | 未检查null值 | 添加null检查 |
| 性能问题 | 算法复杂度高 | 优化算法 |
| 内存泄漏 | 未清理引用 | 及时释放资源 |

**还需要其他技术细节吗？**`
      ],

      math: [
        `## 🧮 数学解答

让我来帮您解决这个数学问题！

### 📐 问题分析
根据您提供的信息，我需要进行以下计算：

### 💡 解题思路
1. **理解题意**: 明确要求什么
2. **找出关键信息**: 提取数值和条件
3. **选择方法**: 确定解题策略
4. **计算过程**: 逐步求解

### 📝 详细步骤
\`\`\`
步骤1: 设置变量和已知条件
步骤2: 建立数学模型
步骤3: 应用相关公式
步骤4: 计算并验证结果
\`\`\`

### 🎯 答案
> **结果**: [具体计算结果会在这里显示]

### 📚 相关知识点
- **公式**: 涉及的数学公式
- **概念**: 相关数学概念
- **应用**: 实际应用场景

需要我展示具体的计算过程吗？`,

        `## 📊 数学建模

这是一个有趣的数学问题！让我为您提供系统的分析：

### 🔢 数值分析
假设我们有以下数据：

| 参数 | 数值 | 单位 | 说明 |
|------|------|------|------|
| x | 变量 | - | 未知数 |
| y | 函数值 | - | 结果 |
| 常数 | 固定值 | - | 已知条件 |

### 📈 图形表示
\`\`\`
y = f(x) 的图像特征:
- 定义域: [a, b]
- 值域: [c, d]
- 单调性: 递增/递减
- 极值点: 最大值/最小值
\`\`\`

### 🎲 概率统计
如果涉及概率问题：
- **样本空间**: Ω = {所有可能结果}
- **事件**: A ⊆ Ω
- **概率**: P(A) = |A| / |Ω|

**需要我进一步计算具体数值吗？**`
      ],

      explanation: [
        `## 📚 概念解释

很高兴为您解释这个概念！

### 🎯 核心定义
> **简单来说**: [用最通俗的语言解释核心概念]

### 🧩 详细阐述
这个概念包含以下几个关键要素：

1. **基本特征**: 最重要的属性和特点
2. **工作原理**: 它是如何运作的
3. **应用场景**: 在什么情况下会用到
4. **相关概念**: 与之相关的其他概念

### 🌰 举例说明
为了更好地理解，让我们看几个实际例子：

#### 例子1: 日常生活中的应用
- **情况**: 具体场景描述
- **体现**: 概念如何在其中体现
- **效果**: 产生的结果

#### 例子2: 专业领域的应用
- **背景**: 专业环境介绍
- **运用**: 概念的具体运用
- **价值**: 带来的专业价值

### 💭 深入思考
- **为什么重要**: 这个概念的意义所在
- **历史发展**: 概念的演进过程
- **未来趋势**: 可能的发展方向

还有什么细节需要我进一步解释的吗？`,

        `## 🔍 深度解析

让我为您提供这个主题的全面解析：

### 📖 基础知识
首先，我们需要理解几个基本概念：

\`\`\`
核心概念 = 基础要素 + 组合规律 + 应用方法
\`\`\`

### 🏗️ 结构分析
| 层级 | 内容 | 重要性 |
|------|------|--------|
| 表层 | 直观现象 | ⭐⭐⭐ |
| 中层 | 运行机制 | ⭐⭐⭐⭐ |
| 深层 | 本质规律 | ⭐⭐⭐⭐⭐ |

### 🎭 多角度视角
- **理论角度**: 学术和科学的观点
- **实践角度**: 应用和操作的层面
- **历史角度**: 发展和演变的过程
- **未来角度**: 趋势和可能的变化

### 🧠 记忆技巧
为了帮助您更好地记住和理解：
1. **关键词联想**: 找出核心关键词
2. **图像化记忆**: 将抽象概念具象化
3. **类比学习**: 与熟悉的事物对比

**您希望我重点讲解哪个方面？**`
      ],

      howto: [
        `## 📋 操作指南

我来为您提供详细的操作步骤！

### 🎯 准备工作
在开始之前，请确保您已经准备好：
- ✅ 必要的工具和材料
- ✅ 基础知识和技能
- ✅ 充足的时间和精力

### 📝 详细步骤

#### 第一阶段：基础准备
1. **环境配置**
   - 设置工作环境
   - 检查必要条件
   - 准备所需资源

2. **初始化设置**
   \`\`\`bash
   # 示例命令
   mkdir project
   cd project
   npm init -y
   \`\`\`

#### 第二阶段：核心实施
3. **主要操作**
   - 按照标准流程执行
   - 注意关键节点控制
   - 及时记录进展

4. **质量控制**
   - 定期检查结果
   - 对比预期目标
   - 必要时进行调整

#### 第三阶段：完善优化
5. **测试验证**
   - 功能性测试
   - 性能测试
   - 用户体验测试

6. **最终优化**
   - 根据测试结果调整
   - 完善细节处理
   - 形成最终方案

### ⚠️ 注意事项
- **常见错误**: 避免这些典型问题
- **关键要点**: 不能忽视的重要环节
- **备选方案**: 遇到问题时的替代选择

### 🏆 成功标准
- [ ] 达到预期功能
- [ ] 性能指标合格
- [ ] 用户满意度高

需要我详细解释某个具体步骤吗？`
      ],

      comparison: [
        `## ⚖️ 对比分析

我来为您提供全面的对比分析！

### 📊 核心对比

| 维度 | 方案A | 方案B | 胜出方 |
|------|-------|-------|--------|
| **性能** | 🟢 优秀 | 🟡 良好 | A |
| **成本** | 🟡 中等 | 🟢 较低 | B |
| **易用性** | 🟢 简单 | 🔴 复杂 | A |
| **扩展性** | 🟡 有限 | 🟢 强大 | B |
| **稳定性** | 🟢 很稳定 | 🟢 很稳定 | 平局 |

### 🎯 详细分析

#### 优势对比
**方案A的优势：**
- ✅ 性能表现出色
- ✅ 学习成本低
- ✅ 社区支持好
- ✅ 文档完善

**方案B的优势：**
- ✅ 成本更经济
- ✅ 功能更丰富
- ✅ 定制性强
- ✅ 未来潜力大

### 🎪 使用场景
- **选择A**: 如果您重视简单快速、预算充足
- **选择B**: 如果您需要深度定制、长期发展

### 🏆 推荐建议
基于您的具体需求，我的建议是：
> **结论**: [根据具体情况给出推荐]

需要我针对您的具体情况做更详细的分析吗？`
      ],

      recommendation: [
        `## 🎯 专业推荐

基于您的需求，我来为您提供专业的推荐建议！

### 🏆 最佳选择
经过综合分析，我的**首要推荐**是：

> **推荐方案**: [具体推荐的选项]
> 
> **推荐理由**: 这个选择在您的使用场景下具有最佳的性价比和实用性

### 📊 推荐依据

#### 🎪 匹配度分析
- **需求匹配**: ⭐⭐⭐⭐⭐ (完美符合)
- **预算适配**: ⭐⭐⭐⭐ (性价比高)
- **技能要求**: ⭐⭐⭐ (容易掌握)
- **未来扩展**: ⭐⭐⭐⭐ (发展空间大)

### 📋 实施建议

#### 🚀 快速开始
1. **第一步**: 从最基础的功能开始
2. **第二步**: 逐步添加高级特性
3. **第三步**: 根据使用情况优化调整

### 💡 专家提示
- **关键成功因素**: 最重要的几个要点
- **常见陷阱**: 需要避免的问题
- **优化建议**: 提升效果的方法

有什么具体问题需要我进一步解答吗？`
      ],

      creative: [
        `## 🎨 创意思考

让我们一起发挥创意，探索这个话题的无限可能！

### 💡 头脑风暴
首先，让我们从不同角度思考：

#### 🌈 创意维度
- **传统视角**: 常规的理解和方法
- **逆向思维**: 反其道而行之的可能
- **跨界融合**: 结合其他领域的元素
- **未来想象**: 前瞻性的创新思路

### 🎪 创意方案

#### 方案1: "突破边界"
\`\`\`
核心理念: 打破常规限制
实现方式: 
  - 重新定义问题本质
  - 引入全新技术元素
  - 创造独特用户体验
预期效果: 颠覆性创新
\`\`\`

### 🚀 创新要素
| 要素 | 传统做法 | 创新思路 | 突破点 |
|------|----------|----------|--------|
| 交互方式 | 点击操作 | 手势/语音/AI | 自然交互 |
| 视觉设计 | 平面布局 | 3D/AR/动效 | 沉浸体验 |
| 数据处理 | 静态分析 | 实时智能 | 预测能力 |

### 🎭 情感连接
创意不仅仅是功能，更要创造情感共鸣：
- **惊喜感**: 超出预期的体验
- **成就感**: 让用户感到自豪
- **归属感**: 创造社区和文化

想要深入探讨哪个创意方向？`
      ],

      general: [
        `## 💬 综合解答

感谢您的提问！让我为您提供全面的回答：

### 🎯 问题理解
根据您的描述，我理解您想了解的是关于：

- **核心要点**: 问题的本质和关键
- **相关信息**: 与此相关的背景知识
- **实际应用**: 在现实中的运用情况

### 📚 详细分析

#### 🔍 多维度解读
让我们从几个不同角度来分析这个问题：

1. **理论层面**: 基础概念和原理
2. **实践层面**: 具体操作和应用
3. **发展层面**: 趋势和未来可能

#### 📊 关键信息
| 方面 | 描述 | 重要性 |
|------|------|--------|
| 基础概念 | 核心定义和特征 | ⭐⭐⭐⭐⭐ |
| 应用场景 | 实际使用情况 | ⭐⭐⭐⭐ |
| 发展趋势 | 未来变化方向 | ⭐⭐⭐ |

### 🌟 核心观点
> **重要提示**: 这个问题涉及多个层面，需要综合考虑各种因素

### 💡 实用建议
基于分析，我的建议是：

1. **短期行动**: 立即可以采取的措施
2. **中期规划**: 阶段性的发展计划  
3. **长期展望**: 未来的发展方向

**您希望我详细展开讨论哪个具体方面？**`
      ]
    };

    const typeResponses = responses[type] || responses.general;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  }

  // 根据输入生成个性化回答
  static generatePersonalizedResponse(input: string): string {
    const questionType = this.detectQuestionType(input);
    const baseResponse = this.generateResponse(input, questionType);
    
    // 添加个性化元素，比如引用用户的具体问题
    const personalizedIntro = this.getPersonalizedIntro(input, questionType);
    
    return personalizedIntro + '\n\n' + baseResponse;
  }

  // 生成个性化开头
  static getPersonalizedIntro(input: string, type: string): string {
    const inputPreview = input.length > 30 ? input.slice(0, 30) + "..." : input;
    
    const intros = {
      code: [
        `关于您提到的"${inputPreview}"这个编程问题，`,
        `看到您在处理"${inputPreview}"相关的代码问题，`,
        `针对您描述的"${inputPreview}"这个技术挑战，`
      ],
      math: [
        `关于您的数学问题"${inputPreview}"，`,
        `看到您需要计算"${inputPreview}"，`,
        `针对您提出的"${inputPreview}"这个数学问题，`
      ],
      explanation: [
        `您想了解"${inputPreview}"的相关概念，`,
        `关于"${inputPreview}"这个话题，`,
        `针对您询问的"${inputPreview}"，`
      ],
      general: [
        `关于您提到的"${inputPreview}"，`,
        `看到您的问题"${inputPreview}"，`,
        `针对您关心的"${inputPreview}"这个话题，`
      ]
    };

    const typeIntros = intros[type] || intros.general;
    return typeIntros[Math.floor(Math.random() * typeIntros.length)];
  }
}

export const useChat = (): ChatState & { sendMessage: (content: string) => Promise<void> } => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `# 🤖 欢迎使用 AI Feidom Chat！

我是您的智能助手，能够帮助您解决各种类型的问题：

## 🎯 我能帮您做什么？

### 💻 技术开发
- **编程问题**: 代码调试、算法设计、最佳实践
- **技术选型**: 框架对比、工具推荐、架构设计
- **问题排查**: Bug分析、性能优化、解决方案

### 📚 学习教育  
- **概念解释**: 深入浅出地解释复杂概念
- **知识梳理**: 系统化整理相关知识点
- **学习指导**: 提供学习路径和方法建议

### 🧮 数据分析
- **数学计算**: 复杂运算、公式推导、统计分析
- **数据解读**: 图表分析、趋势预测、洞察发现
- **建模思路**: 数学建模、算法设计、优化方案

### 🎨 创意思考
- **头脑风暴**: 创新想法、解决方案、设计思路
- **方案设计**: 项目规划、流程优化、策略制定
- **跨界思维**: 多角度分析、创新组合、灵感激发

### 💡 决策支持
- **对比分析**: 多方案比较、优劣评估、选择建议
- **风险评估**: 潜在问题识别、应对策略、预防措施
- **实施指导**: 具体步骤、注意事项、成功要素

---

🌟 **特色功能**：所有回答都采用结构化的 Markdown 格式，包含丰富的表格、代码块、列表等，让信息更清晰易读！

请告诉我您遇到了什么问题，我会为您提供详细的解答和建议！`,
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
      // 模拟 AI 响应延迟（根据问题复杂度调整）
      const complexity = AIResponseGenerator.detectQuestionType(content);
      const baseDelay = complexity === 'code' || complexity === 'math' ? 2000 : 1500;
      const randomDelay = Math.random() * 1000;
      
      await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));

      // 生成智能 AI 响应
      const aiResponse = AIResponseGenerator.generatePersonalizedResponse(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
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