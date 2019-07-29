# chengbei_taishan
球迷通小程序
# 开发

* 采用原生小程序开发规范编写
* 涉及小程序开发技术
  * 微信小程序前端开发
  * 微信小程序云开发
* 

# 发布

> 本项目未配置云函数全局变量，需要修改部分文件的环境变量才可正常访问和使用

## 涉及本地修改
* app.js
  * wx.cloud.init()  // 云函数全局环境变量
  * globalData.databaseEnv  // 云数据库全局环境变量
* cloudfunctions
  * docadd -> index.js -> cloud.database()
  * docupdata -> index.js -> cloud.database()