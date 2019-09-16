// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
// 创建更新数据库云函数
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
// 全局云数据库环境ID  测试环境 'taishanchengbei' 生产环境 'prodenv-2sbjk'
const db = cloud.database({ env: 'prodenv-2sbjk' })

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 参数：
  event = {
    dbId: dbId, // 数据库ID
    docId: docId, // 数据库数据ID
    data: data // 存储的数据库集合
  }
 * 
 */
exports.main = async (event, context) => {
  try {
    return await db.collection(event.dbId).doc(event.docId).update({
     // data 传入需要局部更新的数据
      data: event.data,
      success: function(res) {
        console.log('docupdata成功', res)
      },
      fail: function(err) {
        console.log('docupdata失败', err)
      }
    })
  } catch (e) {
    console.error(e)
  }
}
