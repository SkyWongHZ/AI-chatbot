import axios from 'axios'
import { config } from '../config'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class AIService {
  private conversationHistory: ChatMessage[] = []

  async chat(message: string): Promise<string> {
    // 添加用户消息到历史
    this.conversationHistory.push({
      role: 'user',
      content: message
    })

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
            ...this.conversationHistory
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

      // 添加助手回复到历史
      this.conversationHistory.push({
        role: 'assistant',
        content: reply
      })

      // 保持历史记录在合理范围内
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20)
      }

      return reply
    } catch (error) {
      console.error('AI Service Error:', error)
      throw new Error('Failed to get AI response')
    }
  }

  clearHistory(): void {
    this.conversationHistory = []
  }
}
