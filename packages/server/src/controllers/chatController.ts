import { Context } from 'koa'
import { AIService } from '../services/aiService'

export class ChatController {
  private aiService: AIService

  constructor() {
    this.aiService = new AIService()
  }

  chat = async (ctx: Context) => {
    const { message } = ctx.request.body as { message: string }

    if (!message || typeof message !== 'string') {
      ctx.status = 400
      ctx.body = { error: 'Message is required' }
      return
    }

    try {
      const reply = await this.aiService.chat(message)
      ctx.body = {
        data: { reply }
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: 'Failed to get AI response' }
    }
  }
}
