import { useChatStore } from '@/store/chat'
import { storeToRefs } from 'pinia'

export function useChat() {
  const store = useChatStore()
  const { messages, loading } = storeToRefs(store)

  return {
    messages,
    loading,
    sendMessage: store.sendMessage,
    clearMessages: store.clearMessages
  }
}
