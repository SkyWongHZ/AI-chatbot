import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa-cors'
import { config } from './config'
import router from './routes'
import { errorHandler } from './middlewares/errorHandler'

const app = new Koa()

// 中间件
app.use(errorHandler)
app.use(logger())
app.use(cors())
app.use(bodyParser())

// 路由
app.use(router.routes())
app.use(router.allowedMethods())

// 启动服务器
const PORT = config.port

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
