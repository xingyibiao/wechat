/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:12:02 
 * @Last Modified by: xingyibiao
 * @Last Modified time: 2017-10-22 13:43:20
 */
'use strict'
const Router = require('koa-router')
const router = new Router()
const {validateSign, testAccess} = require('../controller/validateSign.controller')
const msgHandler = require('../controller/msg.controller')

// 验证微信服务器
router.get('/', validateSign)

// 接受微信服务器消息
router.post('/', msgHandler)

// 测试access_token
router.get('/testAccess', testAccess)

module.exports = router