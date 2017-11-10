/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:11:38 
 * @Last Modified by: xingyibiao
 * @Last Modified time: 2017-10-22 13:57:50
 */
'use strict'
const {xml2Json, formatMessage} = require('../utils')

class MsgHandler {
  atachMsg() {
    return (ctx, next) => {
      const buf = []
      ctx.req.on('data', (data) => {
        buf.push(data)
      })
      ctx.req.on('end', async(data) => {
        const msgXml = Buffer.concat(buf).toString('utf-8')
        const content = await xml2Json(msgXml)
        const msgJson = formatMessage(content.xml)
        console.log(msgJson)
      })
    }
  }
}

const msgHandler = new MsgHandler().atachMsg()
module.exports = msgHandler