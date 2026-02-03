import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatApi } from '@/api/chat'
import { getUserId } from '@/utils/user'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const userId = getUserId()

  const addMessage = (role: Message['role'], content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now()
    }
    messages.value.push(message)
    return message
  }

  const loadHistory = async () => {
    try {
      const response = await chatApi.getHistory(userId)
      messages.value = response.data.history.map((msg, index) => ({
        id: `history-${index}`,
        role: msg.role,
        content: msg.content,
        timestamp: Date.now() - (response.data.history.length - index) * 1000
      }))
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  const sendMessage = async (content: string) => {
    addMessage('user', content)
    loading.value = true

    try {
      const response = await chatApi.send(content, userId)
      addMessage('assistant', response.data.reply)
    } catch (error) {
      addMessage('assistant', '抱歉，发生了错误，请稍后重试。')
    } finally {
      loading.value = false
    }
  }

  const clearMessages = async () => {
    try {
      await chatApi.clearHistory(userId)
      messages.value = []
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }

  return {
    messages,
    loading,
    loadHistory,
    sendMessage,
    clearMessages
  }
})
