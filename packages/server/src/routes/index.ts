import Router from 'koa-router'
import chatRouter from './chat'

const router = new Router()

// 健康检查
router.get('/api/health', (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() }
})

// 聊天路由
router.use(chatRouter.routes())

export default router
