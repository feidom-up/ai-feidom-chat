# AI Feidom Chat

一个使用 TypeScript 和 React 构建的现代化 AI 聊天应用，支持 **Markdown 渲染**。

## 🌟 功能特点

- 🤖 智能聊天界面
- 💬 实时消息显示
- 📝 **Markdown 格式支持** - AI 回复支持丰富的 Markdown 格式
- 🎨 现代化 UI 设计
- 📱 响应式布局
- ⚡ TypeScript 支持
- 🔄 消息加载动画
- 🎭 渐变背景和玻璃态效果
- 🌈 语法高亮代码块
- 📊 表格和列表支持

## 📝 Markdown 功能展示

AI 回复支持以下 Markdown 格式：

### 🔤 文本格式
- **粗体文本** - `**粗体**`
- *斜体文本* - `*斜体*`
- `行内代码` - `` `代码` ``

### 📋 结构化内容
- # 一级标题
- ## 二级标题
- ### 三级标题
- 有序列表和无序列表
- > 引用块
- 表格支持

### 💻 代码块
```javascript
function example() {
  console.log("支持语法高亮的代码块");
}
```

### 🎯 特殊功能
- ✅ 任务列表
- 🔗 链接支持
- 📊 表格渲染
- 🎨 自定义样式

## 🛠️ 技术栈

- **Frontend**: React 18
- **Language**: TypeScript
- **Icons**: Lucide React
- **Markdown**: React-Markdown + 插件
- **Styling**: CSS-in-JS

### Markdown 相关依赖
- `react-markdown` - Markdown 渲染
- `remark-gfm` - GitHub 风格 Markdown 支持
- `rehype-highlight` - 代码语法高亮
- `rehype-raw` - HTML 标签支持

## 🚀 快速开始

### 克隆项目
```bash
git clone https://github.com/feidom-up/ai-feidom-chat.git
cd ai-feidom-chat
```

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建项目
```bash
npm run build
```

**构建命令**: `npm run build`  
**输出目录**: `build/`

## 📁 项目结构

```
ai-feidom-chat/
├── public/
│   └── index.html              # HTML 模板
├── src/
│   ├── components/             # React 组件
│   │   ├── ChatHeader.tsx      # 聊天头部组件
│   │   ├── MessageBubble.tsx   # 消息气泡组件（支持 Markdown）
│   │   ├── ChatInput.tsx       # 输入框组件
│   │   ├── LoadingIndicator.tsx # 加载指示器
│   │   └── MarkdownRenderer.tsx # Markdown 渲染组件 ✨
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useChat.ts          # 聊天逻辑 Hook（包含 Markdown 回复）
│   ├── types.ts                # TypeScript 类型定义
│   ├── App.tsx                 # 主应用组件
│   └── index.tsx               # 应用入口
├── package.json                # 项目配置（包含 Markdown 依赖）
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目说明
```

## 🔧 组件说明

### ChatHeader
聊天界面的头部组件，显示应用标题、状态指示器等。

### MessageBubble ✨
消息气泡组件，支持：
- 用户消息：普通文本显示
- AI 消息：**Markdown 格式渲染**
- 时间戳显示
- 响应式设计

### MarkdownRenderer ✨
专门的 Markdown 渲染组件，支持：
- GitHub 风格的 Markdown
- 语法高亮代码块
- 表格渲染
- 自定义样式主题
- 安全的 HTML 渲染

### ChatInput
消息输入组件，支持：
- 多行文本输入
- Enter 发送消息
- Shift+Enter 换行
- 发送按钮状态管理

### LoadingIndicator
加载动画组件，在AI思考时显示动态效果。

### useChat Hook ✨
自定义Hook，管理聊天状态：
- 消息列表管理
- **智能 Markdown 回复生成**
- 加载状态控制
- 错误处理

## ⚙️ Markdown 配置

### 自定义 AI 回复
在 `src/hooks/useChat.ts` 中，AI 回复包含丰富的 Markdown 格式：

```typescript
const responses = [
  `## 📚 关于您的问题

这是一个**很有趣**的问题！让我来为您详细解答：

### 主要观点
1. 首先，我们需要理解问题的本质
2. 然后分析可能的解决方案
3. 最后提供具体的建议

> 💡 **提示**: 如果您需要更详细的解释，请随时告诉我！`,
  // 更多 Markdown 格式的回复...
];
```

### 样式定制
Markdown 渲染器支持完全自定义的样式：
- `markdownStyles` - 完整的 Markdown 样式
- 代码块高亮主题
- 表格样式
- 引用块样式
- 响应式设计

## 🌐 部署

### GitHub Pages
```bash
npm run build
# 将 build 文件夹内容部署到 GitHub Pages
```

### Vercel
```bash
# 构建命令: npm run build
# 输出目录: build
```

### Netlify
```bash
# 构建命令: npm run build
# 发布目录: build
```

## 📦 在本地 projects 文件夹运行

### 方法一：Git 克隆（推荐）
```bash
# 进入 projects 目录
cd ~/projects           # macOS/Linux
# 或 cd C:\projects     # Windows

# 克隆项目
git clone https://github.com/feidom-up/ai-feidom-chat.git

# 进入项目目录
cd ai-feidom-chat

# 安装依赖
npm install

# 启动项目
npm start
```

### 方法二：下载 ZIP
1. 访问 https://github.com/feidom-up/ai-feidom-chat
2. 点击绿色 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到 projects 文件夹
5. 在项目目录中运行 `npm install` 和 `npm start`

## 🎯 Markdown 功能演示

AI 可以回复包含以下格式的内容：

1. **结构化文档** - 标题、段落、列表
2. **代码示例** - 语法高亮的代码块
3. **数据表格** - 格式化的数据展示
4. **引用说明** - 突出显示的重要信息
5. **任务列表** - 可交互的清单
6. **链接资源** - 外部资源引用

## 🔮 未来计划

- [ ] 连接真实 AI API（OpenAI、Claude 等）
- [ ] 添加用户认证系统
- [ ] 实现聊天历史保存
- [ ] 支持文件上传功能
- [ ] 添加语音输入输出
- [ ] 多主题切换功能
- [ ] 多语言支持
- [x] **Markdown 渲染支持** ✅
- [ ] LaTeX 数学公式支持
- [ ] 图片和媒体文件展示
- [ ] 消息搜索功能

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

### 开发流程
1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues: [提交问题](https://github.com/feidom-up/ai-feidom-chat/issues)
- 项目地址: https://github.com/feidom-up/ai-feidom-chat

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！

🎉 **特别亮点**: 支持完整的 Markdown 渲染，让 AI 回复更加丰富和专业！