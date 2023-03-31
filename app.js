const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./router_handler/config')
const userRouter = require('./router/user')
const userInfo = require('./router/userInfo')
// 解析token的中间件
const { expressjwt: jwt } = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(jwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') return res.send('身份认证失败,请重新登录.')
})
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRouter)
app.use('/my', userInfo)
app.listen(5000, () => {
  console.log('服务器启动成功，服务器地址：http://localhost:5000/')
})
