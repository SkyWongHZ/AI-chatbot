import { Context, Next } from 'koa'

export async function authMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    ctx.status = 401
    ctx.body = { error: 'Unauthorized' }
    return
  }

  // 这里可以添加 token 验证逻辑
  // 例如 JWT 验证

  await next()
}
