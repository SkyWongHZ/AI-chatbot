import axios from 'axios'
import { config } from '../config'
import prisma from '../db/prisma'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class AIService {
  // 获取或创建用户的对话记录
  private async getOrCreateConversation(userId: string) {
    let conversation = await prisma.conversation.findFirst({
      where: { userId }
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId,
          messages: []
        }
      })
    }

    return conversation
  }

  // 聊天
  async chat(userId: string, message: string): Promise<string> {
    const conversation = await this.getOrCreateConversation(userId)

    // 构建历史消息
    const historyMessages: ChatMessage[] = conversation.messages.map((msg) => ({
      role: msg.role as 'system' | 'user' | 'assistant',
      content: msg.content
    }))

    // 添加用户消息
    const userMessage: ChatMessage = {
      role: 'user',
      content: message
    }

    try {
      const response = await axios.post(
        config.ai.apiUrl,
        {
          model: config.ai.model,
          messages: [
            {
              role: 'system',
              content: '你是一个友好的AI助手，用中文回答用户的问题。'
            },
            ...historyMessages,
            userMessage
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.ai.apiKey}`
          }
        }
      )

      const reply = response.data.choices[0].message.content

      // 更新对话记录到数据库
      let newMessages = [
        ...conversation.messages,
        { role: 'user', content: message, createdAt: new Date() },
        { role: 'assistant', content: reply, createdAt: new Date() }
      ]

      // 保持历史记录在合理范围内（最多20条）
      if (newMessages.length > 20) {
        newMessages = newMessages.slice(-20)
      }

      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { messages: newMessages }
      })

      return reply
    } catch (error) {
      console.error('AI Service Error:', error)
      throw new Error('Failed to get AI response')
    }
  }

  // 获取对话历史
  async getHistory(userId: string): Promise<ChatMessage[]> {
    const conversation = await prisma.conversation.findFirst({
      where: { userId }
    })

    if (!conversation) {
      return []
    }

    return conversation.messages.map((msg) => ({
      role: msg.role as 'system' | 'user' | 'assistant',
      content: msg.content
    }))
  }

  // 清空对话历史
  async clearHistory(userId: string): Promise<void> {
    await prisma.conversation.updateMany({
      where: { userId },
      data: { messages: [] }
    })
  }
}
