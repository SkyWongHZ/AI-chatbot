export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
