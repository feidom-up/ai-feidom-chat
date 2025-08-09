# AI Feidom Chat

一个使用 TypeScript 和 React 构建的现代化 AI 聊天应用，集成了真实的 OpenAI GPT 模型。

## 🌟 功能特点

- 🤖 **真实 AI 聊天**: 集成 OpenAI GPT 模型，支持真实的智能对话
- 💬 实时消息显示
- 🎨 现代化 UI 设计
- 📱 响应式布局
- ⚡ TypeScript 支持
- 🔄 消息加载动画
- 🎭 渐变背景和玻璃态效果
- 🔗 **GraphQL API**: 使用 GraphQL 接口与 Cloudflare Worker 通信
- 🌐 **连接状态显示**: 实时显示与 AI 服务的连接状态
- 📊 **Token 使用统计**: 显示 API 使用情况（控制台）

## 🛠️ 技术栈

- **Frontend**: React 18
- **Language**: TypeScript
- **Icons**: Lucide React
- **Styling**: CSS-in-JS
- **API**: GraphQL + Cloudflare Workers
- **AI**: OpenAI GPT Models

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

### 环境配置
```bash
# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，配置 GraphQL 端点
REACT_APP_GRAPHQL_ENDPOINT=https://ai-feidom-graphql-worker.bcq9529.workers.dev/graphql
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

构建文件将输出到 `build` 文件夹。

## 📁 项目结构

```
ai-feidom-chat/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── components/         # React 组件
│   │   ├── ChatHeader.tsx  # 聊天头部组件
│   │   ├── MessageBubble.tsx # 消息气泡组件
│   │   ├── ChatInput.tsx   # 输入框组件
│   │   ├── LoadingIndicator.tsx # 加载指示器
│   │   └── ConnectionStatus.tsx # 连接状态组件
│   ├── hooks/              # 自定义 Hooks
│   │   └── useChat.ts      # 聊天逻辑 Hook（集成真实 AI）
│   ├── services/           # API 服务
│   │   └── graphqlChatService.ts # GraphQL API 服务
│   ├── types.ts            # TypeScript 类型定义
│   ├── App.tsx             # 主应用组件
│   └── index.tsx           # 应用入口
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── .env.example            # 环境变量示例
└── README.md               # 项目说明
```

## 🔧 组件说明

### ChatHeader
聊天界面的头部组件，显示应用标题、状态指示器等。

### MessageBubble
消息气泡组件，支持用户和AI消息的不同样式显示。

### ChatInput
消息输入组件，支持：
- 多行文本输入
- Enter 发送消息
- Shift+Enter 换行
- 发送按钮状态管理

### LoadingIndicator
加载动画组件，在AI思考时显示动态效果。

### ConnectionStatus
连接状态组件，显示与 AI 服务的实时连接状态：
- ✅ 已连接：绿色指示器
- ❌ 连接失败：红色指示器
- 详细状态信息

### useChat Hook
自定义Hook，管理聊天状态：
- 消息列表管理
- 真实 AI API 调用
- 加载状态控制
- 错误处理
- 连接状态监控

### GraphQL Chat Service
GraphQL API 服务类，负责：
- 与 Cloudflare Worker 通信
- 处理聊天请求和响应
- 错误处理和重试逻辑
- 健康检查

## ⚙️ AI 配置

### 支持的模型
- `gpt-3.5-turbo` (默认)
- `gpt-4`
- 其他 OpenAI 模型

### 可调参数
- `temperature`: 随机性控制 (0-2)
- `max_tokens`: 最大生成 token 数
- `top_p`: 核心采样 (0-1)
- `frequency_penalty`: 频率惩罚 (-2 到 2)
- `presence_penalty`: 存在惩罚 (-2 到 2)

### 修改 AI 参数
在 `src/hooks/useChat.ts` 中的 `sendMessage` 函数里修改：

```typescript
const response = await graphqlChatService.sendChatMessage(graphqlMessages, {
  model: 'gpt-4', // 改为 GPT-4
  temperature: 0.8, // 提高创造性
  max_tokens: 2000, // 增加输出长度
  top_p: 0.9,
  frequency_penalty: 0.1,
  presence_penalty: 0.1
});
```

## 🌐 部署

### GitHub Pages
```bash
npm run build
# 将 build 文件夹内容部署到 GitHub Pages
```

### Vercel
1. 连接 GitHub 仓库
2. 设置环境变量 `REACT_APP_GRAPHQL_ENDPOINT`
3. 自动部署

### Netlify
1. 连接 GitHub 仓库
2. 设置环境变量
3. 自动部署

## 📦 在本地 projects 文件夹运行

### 方法一：Git 克隆（推荐）
```bash
# 进入 projects 目录
cd ~/projects
# 或 cd C:\projects (Windows)

# 克隆项目
git clone https://github.com/feidom-up/ai-feidom-chat.git

# 进入项目目录
cd ai-feidom-chat

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 启动项目
npm start
```

### 方法二：下载 ZIP
1. 访问 https://github.com/feidom-up/ai-feidom-chat
2. 点击绿色 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到 projects 文件夹
5. 在项目目录中运行 `npm install` 和 `npm start`

## 🔍 故障排除

### 常见问题

#### 1. 连接失败
- **症状**: 连接状态显示红色 ❌
- **解决方案**: 
  - 检查网络连接
  - 确认 GraphQL 端点 URL 正确
  - 检查 Cloudflare Worker 是否正常运行

#### 2. API Key 错误
- **症状**: 错误信息显示 "OpenAI API key is not configured"
- **解决方案**: 
  - 确认 Cloudflare Worker 已配置 OpenAI API Key
  - 运行 `wrangler secret put OPENAI_API_KEY`

#### 3. 网络超时
- **症状**: 请求长时间无响应
- **解决方案**: 
  - 检查网络连接
  - 尝试刷新页面
  - 检查防火墙设置

### 调试模式
打开浏览器开发者工具查看：
- 控制台日志
- 网络请求
- Token 使用统计

## 🎯 功能演示

- **真实 AI 对话**: 基于 OpenAI GPT 模型的智能回复
- **流畅交互**: GraphQL 接口确保快速响应
- **连接监控**: 实时显示服务连接状态
- **错误处理**: 友好的错误提示和恢复机制
- **响应式设计**: 适配手机、平板、桌面设备

## 🔮 未来计划

- [x] 连接真实 AI API（OpenAI GPT）
- [x] GraphQL API 集成
- [x] 连接状态监控
- [ ] 添加用户认证系统
- [ ] 实现聊天历史保存
- [ ] 支持文件上传功能
- [ ] 添加语音输入输出
- [ ] 多主题切换功能
- [ ] 多语言支持
- [ ] 流式响应支持

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

## 🔗 相关项目

- [AI Feidom GraphQL Worker](https://github.com/feidom-up/ai-feidom-graphl-worker) - 后端 GraphQL API 服务

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues: [提交问题](https://github.com/feidom-up/ai-feidom-chat/issues)
- 项目地址: https://github.com/feidom-up/ai-feidom-chat

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！