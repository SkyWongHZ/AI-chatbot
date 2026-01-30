<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'default' | 'danger'
  disabled?: boolean
}>()

defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <button
    class="btn"
    :class="type || 'default'"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.default {
  background: #f0f0f0;
  color: #333;
}

.btn.default:hover:not(:disabled) {
  background: #e0e0e0;
}

.btn.primary {
  background: #4a90d9;
  color: #fff;
}

.btn.primary:hover:not(:disabled) {
  background: #3a7fc8;
}

.btn.danger {
  background: #ff4d4f;
  color: #fff;
}

.btn.danger:hover:not(:disabled) {
  background: #ff7875;
}
</style>
