/*
 * @Author: xingyibiao 
 * @Date: 2017-10-22 13:30:37 
 * @Last Modified by: xingyibiao
 * @Last Modified time: 2017-10-22 14:00:31
 */
'use strict'
const xml2js = require('xml2js')

//
function formatMessage(result) {
  var message = {}
  if(typeof result === 'object'){
    var keys = Object.keys(result)
    for(var i = 0;i < keys.length;i++){
      var item = result[keys[i]]
      var key = keys[i]

      if(!(item instanceof Array) || item.length === 0 ){
        continue
      }
      if(item.length === 1){
        var val = item[0]

        if(typeof val === 'object'){
          message[key] = formatMessage(val)
        }else{
          message[key] = (val || '').trim()
        }
      }else{
        message[key] = []
        for(var j = 0,k = item.length;j<k;j++){
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }
  return message
}

exports.formatMessage = formatMessage

exports.xml2Json = (str) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(str, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.json2Xml = (obj) => {
  const builder = new xml2js.Builder()
  return builder.buildObject(obj)
}