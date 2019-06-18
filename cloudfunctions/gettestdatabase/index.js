// 云函数: get 获取testdatabase
// 使用文件: 
// 用途: 获取数据
// 部署: 在 cloud-functions/gettestdatabase 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
let result = {}

cloud.init()

const db = cloud.database() // 初始化数据库
db.collection('testdatabase').get({
	success: function(res) {
		console.log(res.data)
		result = res.data
	},
	fail: function(err) {
		console.log('error', err)
	}
})

console.log('testdatabase',result)

exports.main = (event, context, result) => {

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    result: result
  }
}
