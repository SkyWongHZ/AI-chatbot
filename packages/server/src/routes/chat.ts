import Router from 'koa-router'
import { ChatController } from '../controllers/chatController'

const router = new Router({ prefix: '/api/chat' })
const chatController = new ChatController()

router.post('/', chatController.chat)

export default router
