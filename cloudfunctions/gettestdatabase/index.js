// 云函数: get 获取testdatabase
// 使用文件: 
// 用途: 获取数据
// 部署: 在 cloud-functions/gettestdatabase 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

cloud.init()

const db = wx.cloud.database() // 初始化数据库
const test = db.collection('testdatabase')

console.log('testdatabase',test)

exports.main = (event, context) => {

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}
