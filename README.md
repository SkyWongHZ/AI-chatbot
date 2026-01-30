# AI Chatbot

AI 聊天机器人全栈项目，前端使用 Vue3 + Vite + Pinia，后端使用 Koa2。

## 项目结构

```
AI-chatbot/
├── .github/                # GitHub Actions 自动部署配置
├── .vscode/                # VS Code 编辑器配置
├── docs/                   # 项目文档
├── packages/
│   ├── client/             # 前端代码 (Vue3 + Vite)
│   └── server/             # 后端代码 (Koa2)
├── scripts/                # 自动化脚本
└── package.json            # 工作区配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

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

### 构建项目

```bash
npm run build
```
需求.md
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
- TypeScript
- MongoDB (可选)

## 环境变量

### 前端 (packages/client/.env)
```
VITE_API_BASE_URL=http://localhost:3000
```

### 后端 (packages/server/.env)
```
PORT=3000
AI_API_KEY=your_api_key
```

## License

MIT
