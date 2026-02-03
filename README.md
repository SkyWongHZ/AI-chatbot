# AI Chatbot

AI 聊天机器人全栈项目，前端使用 Vue3 + Vite + Pinia，后端使用 Koa2 + Prisma + MongoDB。

## 项目结构

```
AI-chatbot/
├── .github/                # GitHub Actions 自动部署配置
├── .vscode/                # VS Code 编辑器配置
├── docs/                   # 项目文档
├── packages/
│   ├── client/             # 前端代码 (Vue3 + Vite)
│   └── server/             # 后端代码 (Koa2 + Prisma)
├── scripts/                # 自动化脚本
└── package.json            # 工作区配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `packages/server/.env.example` 为 `packages/server/.env`，并配置：

```env
PORT=3000
NODE_ENV=development

# AI API 配置
AI_API_KEY=your_api_key
AI_API_URL=https://api.deepseek.com/v1/chat/completions
AI_MODEL=deepseek-chat

# MongoDB 数据库配置
DATABASE_URL="mongodb://用户名:密码@主机:27017/ai-chatbot?authSource=admin&directConnection=true"
```

### 3. 初始化数据库

确保 MongoDB 服务已启动，然后执行：

```bash
cd packages/server
npx prisma db push
npx prisma generate
```

### 4. 启动项目

同时启动前后端：
```bash
npm run dev
```

仅启动前端：
```bash
npm run dev:client
```

仅启动后端：
```bash
npm run dev:server
```

## 构建与部署

### 构建项目

```bash
npm run build
```

### 生产环境

```bash
npm run start
```

## 技术栈

### 前端
- Vue 3
- Vite
- Pinia
- TypeScript

### 后端
- Koa 2
- Prisma (ORM)
- MongoDB
- TypeScript

## 环境变量

### 前端 (packages/client/.env)
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 后端 (packages/server/.env)
```env
PORT=3000
NODE_ENV=development

# AI API 配置
AI_API_KEY=your_api_key
AI_API_URL=https://api.deepseek.com/v1/chat/completions
AI_MODEL=deepseek-chat

# MongoDB 数据库配置
DATABASE_URL="mongodb://用户名:密码@主机:27017/ai-chatbot?authSource=admin&directConnection=true"
```

## 文档

- [API 文档](./docs/API.md)
- [对话持久化实现](./docs/数据持久化方案.md)

## License

MIT
