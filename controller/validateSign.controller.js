/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:12:13 
 * @Last Modified by:   xingyibiao 
 * @Last Modified time: 2017-10-22 13:12:13 
 */
'use strict'
const sha1 = require('sha1')
const config = require('../config/token.json')

// 验证微信服务器
exports.validateSign = (ctx, next) => {
  const token = config.token
  const query = ctx.query
  const timestamp = query.timestamp
  const nonce = query.nonce
  const signature = query.signature
  const echostr = query.echostr

  const tmpStr = [token, timestamp, nonce].sort().join('')
  const sha1Str = sha1(tmpStr)
  
  // 判断是否相等
  if(sha1Str === signature) {
    console.log('success')
    ctx.body = echostr
  } else {
    console.log('failed')
    return false
  }
}

// 测试access_token是否已经保存至 ctx中
exports.testAccess = (ctx, next) => {
  ctx.body = ctx.access_token
}