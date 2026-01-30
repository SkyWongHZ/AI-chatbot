# API 文档

## 基础信息

- Base URL: `http://localhost:3000`
- Content-Type: `application/json`

## 接口列表

### 健康检查

检查服务器状态

**请求**

```
GET /api/health
```

**响应**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 发送聊天消息

发送消息给 AI 并获取回复

**请求**

```
POST /api/chat
```

**请求体**

```json
{
  "message": "你好"
}
```

**响应**

```json
{
  "data": {
    "reply": "你好！有什么我可以帮助你的吗？"
  }
}
```

**错误响应**

```json
{
  "error": "Message is required"
}
```

## 错误码

| 状态码 | 说明 |
|-------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 500 | 服务器内部错误 |
