import { defineStore } from 'pinia'
import { ref } from 'vue'
import { chatApi } from '@/api/chat'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)

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

  const sendMessage = async (content: string) => {
    addMessage('user', content)
    loading.value = true

    try {
      const response = await chatApi.send(content)
      addMessage('assistant', response.data.reply)
    } catch (error) {
      addMessage('assistant', '抱歉，发生了错误，请稍后重试。')
    } finally {
      loading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    loading,
    sendMessage,
    clearMessages
  }
})
