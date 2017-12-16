/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:12:29 
 * @Last Modified by:   xingyibiao 
 * @Last Modified time: 2017-10-22 13:12:29 
 */
'use strict'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
const getAccessToken = require('./controller/accessToken.controller')

// 解析post请求body中间件
app.use(bodyParser())

// 获得access_token中间件
app.use(getAccessToken)

// 路由
app.use(router.routes())

app.listen(3000, () => {
  console.log('gogogo')
})
