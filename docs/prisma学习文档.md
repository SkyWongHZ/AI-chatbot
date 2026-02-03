# Prisma 学习文档

> 本文档针对 AI-chatbot 项目，帮助你快速理解和掌握 Prisma 在项目中的使用。

---

## 一、Prisma 是什么？

Prisma 是一个现代化的 Node.js ORM（对象关系映射），它提供：
- **类型安全**：自动生成 TypeScript 类型
- **直观的 API**：简洁的数据库操作方法
- **多数据库支持**：PostgreSQL、MySQL、MongoDB 等

在本项目中，Prisma 用于操作 MongoDB 数据库，存储用户的对话历史。

---

## 二、项目中的 Prisma 文件结构

```
packages/server/
├── prisma/
│   └── schema.prisma        # 数据模型定义文件（核心）
├── prisma.config.ts         # Prisma 配置文件
├── src/
│   ├── generated/prisma/    # 自动生成的 Prisma Client（不要手动修改）
│   └── db/
│       └── prisma.ts        # Prisma 实例导出
└── .env                     # 数据库连接字符串
```

---

## 三、Schema 文件详解

Schema 文件 (`prisma/schema.prisma`) 是 Prisma 的核心，定义了数据库连接和数据模型。

### 3.1 数据源配置

```prisma
datasource db {
  provider = "mongodb"              // 数据库类型
  url      = env("DATABASE_URL")    // 从环境变量读取连接字符串
}
```

### 3.2 生成器配置

```prisma
generator client {
  provider = "prisma-client"              // 生成 Prisma Client
  output   = "../src/generated/prisma"    // 输出目录
}
```

### 3.3 数据模型定义

**本项目的模型：**

```prisma
// 嵌入类型（MongoDB 特有）- 不会创建单独的集合
type Message {
  role      String   // 消息角色：'user' | 'assistant'
  content   String   // 消息内容
  createdAt DateTime @default(now())  // 创建时间，默认当前时间
}

// 数据模型 - 会创建 Conversation 集合
model Conversation {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  userId    String    // 用户标识
  messages  Message[] // 嵌入的消息数组
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt  // 自动更新时间

  @@index([userId])   // 为 userId 创建索引，加速查询
}
```

### 3.4 字段修饰符说明

| 修饰符 | 说明 | 示例 |
|--------|------|------|
| `@id` | 主键 | `id String @id` |
| `@default()` | 默认值 | `@default(now())` |
| `@map()` | 映射到数据库字段名 | `@map("_id")` |
| `@db.ObjectId` | MongoDB ObjectId 类型 | `@db.ObjectId` |
| `@updatedAt` | 自动更新时间戳 | `updatedAt DateTime @updatedAt` |
| `@@index()` | 创建索引 | `@@index([userId])` |

---

## 四、Prisma Client 使用

### 4.1 创建实例

```typescript
// src/db/prisma.ts
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### 4.2 连接数据库

```typescript
// src/app.ts
import prisma from './db/prisma'

async function start() {
  await prisma.$connect()  // 显式连接
  console.log('Database connected')
}
```

---

## 五、CRUD 操作详解

### 5.1 创建数据 (Create)

```typescript
// 创建一条对话记录
const conversation = await prisma.conversation.create({
  data: {
    userId: 'user-123',
    messages: []  // 空数组
  }
})
```

### 5.2 查询数据 (Read)

```typescript
// 查询单条 - findFirst
const conversation = await prisma.conversation.findFirst({
  where: { userId: 'user-123' }
})

// 查询单条 - findUnique（需要唯一字段）
const conversation = await prisma.conversation.findUnique({
  where: { id: 'xxx' }
})

// 查询多条
const conversations = await prisma.conversation.findMany({
  where: { userId: 'user-123' },
  orderBy: { createdAt: 'desc' },  // 排序
  take: 10  // 限制数量
})
```

### 5.3 更新数据 (Update)

```typescript
// 更新单条
await prisma.conversation.update({
  where: { id: conversation.id },
  data: {
    messages: [
      ...conversation.messages,
      { role: 'user', content: '你好', createdAt: new Date() }
    ]
  }
})

// 批量更新
await prisma.conversation.updateMany({
  where: { userId: 'user-123' },
  data: { messages: [] }  // 清空所有消息
})
```

### 5.4 删除数据 (Delete)

```typescript
// 删除单条
await prisma.conversation.delete({
  where: { id: 'xxx' }
})

// 批量删除
await prisma.conversation.deleteMany({
  where: { userId: 'user-123' }
})
```

---

## 六、本项目中的实际应用

### 6.1 获取或创建对话

```typescript
// services/aiService.ts
private async getOrCreateConversation(userId: string) {
  // 先查询
  let conversation = await prisma.conversation.findFirst({
    where: { userId }
  })

  // 不存在则创建
  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { userId, messages: [] }
    })
  }

  return conversation
}
```

### 6.2 保存对话消息

```typescript
// 添加新消息并更新
const newMessages = [
  ...conversation.messages,
  { role: 'user', content: message, createdAt: new Date() },
  { role: 'assistant', content: reply, createdAt: new Date() }
]

await prisma.conversation.update({
  where: { id: conversation.id },
  data: { messages: newMessages }
})
```

### 6.3 获取对话历史

```typescript
async getHistory(userId: string) {
  const conversation = await prisma.conversation.findFirst({
    where: { userId }
  })

  return conversation?.messages || []
}
```

### 6.4 清空对话历史

```typescript
async clearHistory(userId: string) {
  await prisma.conversation.updateMany({
    where: { userId },
    data: { messages: [] }
  })
}
```

---

## 七、常用命令

```bash
# 同步 Schema 到数据库（MongoDB 使用此命令）
npx prisma db push

# 生成 Prisma Client（修改 schema 后必须执行）
npx prisma generate

# 可视化数据库管理工具
npx prisma studio

# 从现有数据库反向生成 Schema
npx prisma db pull

# 格式化 schema 文件
npx prisma format
```

---

## 八、MongoDB 特有概念

### 8.1 嵌入文档 vs 关联

MongoDB 支持在一个文档中嵌入子文档，Prisma 用 `type` 定义：

```prisma
// 嵌入类型 - 存储在父文档内部
type Message {
  role    String
  content String
}

model Conversation {
  messages Message[]  // 消息直接嵌入在 Conversation 文档中
}
```

数据库中存储的结构：
```json
{
  "_id": "xxx",
  "userId": "user-123",
  "messages": [
    { "role": "user", "content": "你好" },
    { "role": "assistant", "content": "你好！" }
  ]
}
```

### 8.2 ObjectId

MongoDB 使用 ObjectId 作为默认主键：

```prisma
id String @id @default(auto()) @map("_id") @db.ObjectId
```

- `@default(auto())` - 自动生成
- `@map("_id")` - 映射到 MongoDB 的 `_id` 字段
- `@db.ObjectId` - 指定为 ObjectId 类型

### 8.3 directConnection

如果 MongoDB 是 Replica Set 模式，连接字符串需要添加：

```
mongodb://user:pass@host:27017/db?directConnection=true
```

---

## 九、调试技巧

### 9.1 启用查询日志

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
```

### 9.2 使用 Prisma Studio

```bash
npx prisma studio
```

会在浏览器打开一个可视化界面，可以直接查看和编辑数据。

---

## 十、常见问题

### Q1: 修改 schema 后报错？
执行 `npx prisma generate` 重新生成 Client。

### Q2: 连接超时？
检查 MongoDB 服务是否启动，连接字符串是否正确。

### Q3: 找不到模块 '../generated/prisma'？
执行 `npx prisma generate` 生成 Client。

### Q4: 数据库中没有数据？
执行 `npx prisma db push` 同步 Schema。

---

## 十一、官方文档链接

- [Prisma 快速入门](https://www.prisma.io/docs/getting-started)
- [Schema 语法参考](https://www.prisma.io/docs/orm/prisma-schema)
- [CRUD 操作指南](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [MongoDB 连接器](https://www.prisma.io/docs/orm/overview/databases/mongodb)
