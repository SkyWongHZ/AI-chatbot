import request from './request'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  data: {
    reply: string
  }
}

export interface HistoryResponse {
  data: {
    history: ChatMessage[]
  }
}

export const chatApi = {
  send(message: string, userId: string): Promise<ChatResponse> {
    return request.post('/api/chat', { message, userId })
  },

  getHistory(userId: string): Promise<HistoryResponse> {
    return request.get('/api/chat/history', { params: { userId } })
  },

  clearHistory(userId: string): Promise<void> {
    return request.delete('/api/chat/history', { data: { userId } })
  }
}
