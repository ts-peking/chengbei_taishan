# chengbei_taishan(球迷通小程序)
一个由鲁能泰山北京球迷会会员开发的足球活动报名小程序

## 必要条件
* 基于原生微信小程序开发语言、框架进行编写
* 涉及小程序开发技术文档
	* [微信小程序框架参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/)
	* [微信小程序组件参考文档](https://developers.weixin.qq.com/miniprogram/dev/component/)
	* [微信小程序API参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/)
	* [微信小程序云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
* 开发工具
	* 微信开发者工具

## 使用
## 发布

> 本项目未配置云函数全局变量，需要修改部分文件的环境变量才可正常访问和使用

## 涉及本地修改
* app.js
  * wx.cloud.init()  // 云函数全局环境变量
  * globalData.databaseEnv  // 云数据库全局环境变量
* cloudfunctions
  * docadd -> index.js -> cloud.database()
  * docupdata -> index.js -> cloud.database()

## 支持和版本变化

## 其他部分