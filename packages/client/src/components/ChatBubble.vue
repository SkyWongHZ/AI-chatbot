<script setup lang="ts">
import type { Message } from '@/store/chat'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="chat-bubble" :class="message.role">
    <div class="bubble-content">
      {{ message.content }}
    </div>
    <div class="bubble-time">
      {{ new Date(message.timestamp).toLocaleTimeString() }}
    </div>
  </div>
</template>

<style scoped>
.chat-bubble {
  margin-bottom: 16px;
  max-width: 70%;
}

.chat-bubble.user {
  margin-left: auto;
}

.chat-bubble.assistant {
  margin-right: auto;
}

.bubble-content {
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.chat-bubble.user .bubble-content {
  background: #4a90d9;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.chat-bubble.assistant .bubble-content {
  background: #e9e9e9;
  color: #333;
  border-bottom-left-radius: 4px;
}

.bubble-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.chat-bubble.user .bubble-time {
  text-align: right;
}
</style>
