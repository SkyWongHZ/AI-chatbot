<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChatBubble from '@/components/ChatBubble.vue'
import { useChatStore } from '@/store/chat'

const chatStore = useChatStore()
const inputMessage = ref('')

onMounted(() => {
  chatStore.loadHistory()
})

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const message = inputMessage.value
  inputMessage.value = ''

  await chatStore.sendMessage(message)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="chat-container">
    <header class="chat-header">
      <h1>AI Chatbot</h1>
    </header>

    <main class="chat-messages">
      <ChatBubble
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :message="msg"
      />
      <div v-if="chatStore.loading" class="loading">
        AI 正在思考中...
      </div>
    </main>

    <footer class="chat-input">
      <textarea
        v-model="inputMessage"
        placeholder="输入消息..."
        @keydown="handleKeydown"
      ></textarea>
      <button @click="sendMessage" :disabled="chatStore.loading">
        发送
      </button>
    </footer>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
}

.chat-header {
  padding: 16px;
  background: #4a90d9;
  color: #fff;
  text-align: center;
}

.chat-header h1 {
  font-size: 20px;
  font-weight: 500;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.loading {
  text-align: center;
  color: #999;
  padding: 16px;
}

.chat-input {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #eee;
}

.chat-input textarea {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  height: 48px;
  font-size: 14px;
}

.chat-input textarea:focus {
  outline: none;
  border-color: #4a90d9;
}

.chat-input button {
  padding: 12px 24px;
  background: #4a90d9;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.chat-input button:hover {
  background: #3a7fc8;
}

.chat-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
