import Koa from 'koa'
import Router from 'koa-router'
import chalk from 'chalk'
import MockRoutes from './mock/index.mjs'
import cors from 'koa-cors'
const app = new Koa()
const router = new Router()
app.use(cors())
function awaitResult(fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn())
    }, 1000)
  })
}

MockRoutes.forEach(r => {
  router[r.method](r.url, async ctx => {
    const res = await awaitResult(r.response.bind(null, ctx))
    ctx.body = res
  })
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  chalk.green('mock服务已成功运行在3001端口')
})
