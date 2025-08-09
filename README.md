# AI Feidom Chat

一个使用 TypeScript 和 React 构建的现代化 AI 聊天应用。

## 🌟 功能特点

- 🤖 智能聊天界面
- 💬 实时消息显示
- 🎨 现代化 UI 设计
- 📱 响应式布局
- ⚡ TypeScript 支持
- 🔄 消息加载动画
- 🎭 渐变背景和玻璃态效果

## 🛠️ 技术栈

- **Frontend**: React 18
- **Language**: TypeScript
- **Icons**: Lucide React
- **Styling**: CSS-in-JS

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
│   │   └── LoadingIndicator.tsx # 加载指示器
│   ├── hooks/              # 自定义 Hooks
│   │   └── useChat.ts      # 聊天逻辑 Hook
│   ├── types.ts            # TypeScript 类型定义
│   ├── App.tsx             # 主应用组件
│   └── index.tsx           # 应用入口
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
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

### useChat Hook
自定义Hook，管理聊天状态：
- 消息列表管理
- 发送消息逻辑
- 加载状态控制
- 错误处理

## ⚙️ 自定义配置

### 修改AI响应
在 `src/hooks/useChat.ts` 中修改 `responses` 数组来自定义AI回复内容。

### 样式定制
每个组件都导出了对应的样式常量，可以根据需要进行修改：
- `chatHeaderStyles` - 头部样式
- `messageStyles` - 消息样式
- `chatInputStyles` - 输入框样式
- `loadingStyles` - 加载动画样式

## 🌐 部署

### GitHub Pages
1. 构建项目：`npm run build`
2. 将 `build` 文件夹内容部署到 GitHub Pages

### Vercel
1. 连接 GitHub 仓库
2. 自动部署

### Netlify
1. 拖拽 `build` 文件夹到 Netlify
2. 或连接 GitHub 仓库自动部署

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

# 启动项目
npm start
```

### 方法二：下载 ZIP
1. 访问 https://github.com/feidom-up/ai-feidom-chat
2. 点击绿色 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到 projects 文件夹
5. 在项目目录中运行 `npm install` 和 `npm start`

## 🎯 功能演示

- **智能对话**: 模拟 AI 响应，支持多轮对话
- **实时交互**: 发送消息后 AI 会在 1-3 秒内回复
- **流畅动画**: 消息淡入、加载动画、按钮交互效果
- **响应式设计**: 适配手机、平板、桌面设备

## 🔮 未来计划

- [ ] 连接真实 AI API（OpenAI、Claude 等）
- [ ] 添加用户认证系统
- [ ] 实现聊天历史保存
- [ ] 支持文件上传功能
- [ ] 添加语音输入输出
- [ ] 多主题切换功能
- [ ] 多语言支持

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