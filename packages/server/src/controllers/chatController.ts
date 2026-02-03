import { Context } from 'koa'
import { AIService } from '../services/aiService'

export class ChatController {
  private aiService: AIService

  constructor() {
    this.aiService = new AIService()
  }

  chat = async (ctx: Context) => {
    const { message, userId } = ctx.request.body as { message: string; userId: string }

    if (!message || typeof message !== 'string') {
      ctx.status = 400
      ctx.body = { error: 'Message is required' }
      return
    }

    if (!userId || typeof userId !== 'string') {
      ctx.status = 400
      ctx.body = { error: 'UserId is required' }
      return
    }

    try {
      const reply = await this.aiService.chat(userId, message)
      ctx.body = {
        data: { reply }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get AI response' }
    }
  }

  getHistory = async (ctx: Context) => {
    const userId = ctx.query.userId as string

    if (!userId) {
      ctx.status = 400
      ctx.body = { error: 'UserId is required' }
      return
    }

    try {
      const history = await this.aiService.getHistory(userId)
      ctx.body = {
        data: { history }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get history' }
    }
  }

  clearHistory = async (ctx: Context) => {
    const { userId } = ctx.request.body as { userId: string }

    if (!userId) {
      ctx.status = 400
      ctx.body = { error: 'UserId is required' }
      return
    }

    try {
      await this.aiService.clearHistory(userId)
      ctx.body = {
        data: { success: true }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to clear history' }
    }
  }
}
