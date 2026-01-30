<script setup lang="ts">
import { ref } from 'vue'

const apiKey = ref('')
const saved = ref(false)

const saveSettings = () => {
  // 保存设置逻辑
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}
</script>

<template>
  <div class="admin-panel">
    <header class="admin-header">
      <h1>管理面板</h1>
      <router-link to="/" class="back-link">返回聊天</router-link>
    </header>

    <main class="admin-content">
      <section class="settings-section">
        <h2>API 配置</h2>
        <div class="form-group">
          <label>AI API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="输入您的 API Key"
          />
        </div>
        <button @click="saveSettings">保存设置</button>
        <span v-if="saved" class="save-tip">保存成功!</span>
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #333;
  color: #fff;
}

.admin-header h1 {
  font-size: 20px;
}

.back-link {
  color: #fff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.admin-content {
  max-width: 600px;
  margin: 24px auto;
  padding: 0 16px;
}

.settings-section {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.settings-section h2 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #4a90d9;
}

button {
  padding: 12px 24px;
  background: #4a90d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3a7fc8;
}

.save-tip {
  margin-left: 12px;
  color: #52c41a;
}
</style>
