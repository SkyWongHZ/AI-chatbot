export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  userId?: string
}

export interface Conversation {
  id: string
  userId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// 如果使用 MongoDB，可以在这里定义 Mongoose Schema
// import mongoose from 'mongoose'
//
// const messageSchema = new mongoose.Schema({
//   role: { type: String, enum: ['user', 'assistant'], required: true },
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now }
// })
//
// const conversationSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   messages: [messageSchema]
// }, { timestamps: true })
//
// export const ConversationModel = mongoose.model('Conversation', conversationSchema)
