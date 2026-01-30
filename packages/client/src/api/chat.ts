import request from './request'

export interface ChatResponse {
  data: {
    reply: string
  }
}

export const chatApi = {
  send(message: string): Promise<ChatResponse> {
    return request.post('/api/chat', { message })
  }
}
