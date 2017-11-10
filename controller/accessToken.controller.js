/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:11:53 
 * @Last Modified by:   xingyibiao 
 * @Last Modified time: 2017-10-22 13:11:53 
 */
'use strict'
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const accessTokenJson = require('../config/accessToken.json')
const tokenConfig = require('../config/token.json')

// 设置axios 默认baseURl
axios.defaults.baseURL = tokenConfig.baseURL;

class Wechat {
  constructor(tokenConfig) {
    this.config = tokenConfig
    this.appID = this.config.appID
    this.appsecret = this.config.appsecret
  }
  getAccessToken() {
    return async(ctx, next) => {
      const currentTime = new Date().getTime()
      const url = `/cgi-bin/token?grant_type=client_credential&appid=${this.appID}&secret=${this.appsecret}`
  
      if(!accessTokenJson.access_token || accessTokenJson.expires_in < currentTime - 200) {
        try{
          const {data} = await axios.get(url)
          data.expires_in = currentTime + (7200 * 1000)
          fs.writeFile(
            path.resolve(__dirname, '../config/accessToken.json'),
            JSON.stringify(data),
            'utf8',
            (err) => {
              if (err) {
                throw Error(err)
              }
            }
          )
          console.log(data, typeof data)
          ctx.access_token = data.access_token
        }catch (err) {
          throw Error(err)
        }
      } else {
        ctx.access_token = accessTokenJson.access_token
      }
      next()
    }
  }
}

const getAccessToken = new Wechat(tokenConfig).getAccessToken()
module.exports = getAccessToken